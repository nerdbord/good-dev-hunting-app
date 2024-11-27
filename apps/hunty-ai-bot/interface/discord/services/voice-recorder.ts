import {
    joinVoiceChannel,
    VoiceConnection,
    EndBehaviorType,
    AudioReceiveStream,
    VoiceReceiver,
    VoiceConnectionStatus,
    entersState
} from '@discordjs/voice';
import { type VoiceBasedChannel } from 'discord.js';
import { createWriteStream, WriteStream } from 'fs';
import { mkdir } from 'fs/promises';
import { join } from 'path';
import prism from 'prism-media';
import { spawn } from 'child_process';
import { unlink } from 'fs/promises';

export class VoiceRecorder {
    private connection: VoiceConnection | null = null;
    private audioStream: AudioReceiveStream | null = null;
    private writeStream: WriteStream | null = null;
    private readonly recordingsDir: string;
    private isRecording: boolean = false;
    private recordingPath: string | null = null;

    constructor() {
        this.recordingsDir = join(process.cwd(), 'recordings');
        this.ensureRecordingsDirExists().catch(console.error);
    }

    private async ensureRecordingsDirExists(): Promise<void> {
        await mkdir(this.recordingsDir, { recursive: true });
    }

    async startRecording(channel: VoiceBasedChannel): Promise<void> {
        if (this.connection) {
            throw new Error('Already recording');
        }

        try {
            await this.ensureRecordingsDirExists();

            this.connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
                selfDeaf: false,
                selfMute: true
            });

            await entersState(this.connection, VoiceConnectionStatus.Ready, 20_000);

            this.recordingPath = join(this.recordingsDir, `recording-${Date.now()}.pcm`);
            this.isRecording = true;

            const receiver = this.connection.receiver;
            const members = channel.members.filter(member => !member.user.bot);
            if (members.size === 0) {
                throw new Error('No non-bot members in channel');
            }

            // Record the first non-bot user
            const userId = members.first()!.id;
            this.setupAudioPipeline(receiver, userId);

        } catch (error) {
            console.error('Error in startRecording:', error);
            this.cleanup();
            throw error;
        }
    }

    private setupAudioPipeline(receiver: VoiceReceiver, userId: string): void {
        if (!this.isRecording || !this.recordingPath) return;

        console.log(`Starting recording for user ${userId}`);

        try {
            // Get the raw Opus stream from Discord
            this.audioStream = receiver.subscribe(userId, {
                end: { behavior: EndBehaviorType.Manual }
            });

            // Create an Ogg/Opus demuxer
            const demuxer = new prism.opus.Decoder({
                rate: 48000,
                channels: 2,
                frameSize: 960
            });

            this.writeStream = createWriteStream(this.recordingPath);

            // Pipeline: Discord Opus -> Decoder -> PCM -> File
            this.audioStream
                .pipe(demuxer)
                .pipe(this.writeStream);

            // Monitor data flow for debugging
            this.audioStream.on('data', chunk =>
                console.log(`Received audio chunk: ${chunk.length} bytes`));

        } catch (error) {
            console.error('Error setting up audio pipeline:', error);
            this.cleanup();
        }
    }

    async stopRecording(): Promise<string | null> {
        if (!this.isRecording || !this.recordingPath) {
            return null;
        }

        console.log('Stopping recording...');
        this.isRecording = false;
        const pcmPath = this.recordingPath;
        const mp3Path = pcmPath.replace('.pcm', '.mp3');

        return new Promise((resolve) => {
            const timeout = setTimeout(() => {
                console.log('Stop recording timed out, forcing cleanup...');
                this.cleanup();
                this.convertToMp3(pcmPath, mp3Path).catch(console.error);
                resolve(mp3Path);
            }, 3000);

            if (this.writeStream) {
                this.writeStream.on('finish', () => {
                    clearTimeout(timeout);
                    console.log('Recording saved successfully');
                    this.cleanup();
                    this.convertToMp3(pcmPath, mp3Path)
                        .then(() => resolve(mp3Path))
                        .catch((error) => {
                            console.error('Failed to convert to MP3:', error);
                            resolve(pcmPath);
                        });
                });

                if (this.audioStream) {
                    this.audioStream.destroy();
                }
                this.writeStream.end();
            } else {
                clearTimeout(timeout);
                this.cleanup();
                resolve(null);
            }
        });
    }

    private async convertToMp3(pcmPath: string, mp3Path: string): Promise<void> {
        return new Promise((resolve, reject) => {
            console.log('Converting to MP3...');

            const ffmpeg = spawn('ffmpeg', [
                '-f', 's16le',        // Input format is signed 16-bit little endian
                '-ar', '48000',       // Sample rate 48kHz
                '-ac', '2',           // 2 channels (stereo)
                '-i', pcmPath,        // Input file
                '-c:a', 'libmp3lame', // MP3 codec
                '-q:a', '2',          // Quality setting (2 is high quality)
                mp3Path               // Output file
            ]);

            ffmpeg.on('close', async (code) => {
                if (code === 0) {
                    console.log('Conversion completed successfully');
                    try {
                        await unlink(pcmPath);
                        console.log('PCM file removed');
                        resolve();
                    } catch (error) {
                        console.error('Failed to remove PCM file:', error);
                        reject(error);
                    }
                } else {
                    const error = new Error(`FFmpeg exited with code ${code}`);
                    console.error('Conversion failed:', error);
                    reject(error);
                }
            });

            ffmpeg.stderr.on('data', (data) => {
                console.log(`FFmpeg: ${data}`);
            });

            ffmpeg.on('error', (error) => {
                console.error('FFmpeg process error:', error);
                reject(error);
            });
        });
    }

    private cleanup(): void {
        console.log('Cleaning up resources...');
        this.isRecording = false;

        if (this.connection) {
            this.connection.destroy();
            this.connection = null;
        }

        if (this.audioStream) {
            this.audioStream.destroy();
            this.audioStream = null;
        }

        if (this.writeStream) {
            this.writeStream.end();
            this.writeStream = null;
        }

        this.recordingPath = null;
        console.log('Cleanup complete');
    }
}