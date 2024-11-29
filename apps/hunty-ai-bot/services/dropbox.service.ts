import { Dropbox } from 'dropbox';
import { readFile, unlink } from 'fs/promises';
import { basename } from 'path';

export class DropboxService {
    private dropbox: Dropbox;
    private readonly RECORDINGS_PATH = '/recordings';

    constructor() {
        const accessToken = Bun.env.DROPBOX_ACCESS_TOKEN;
        if (!accessToken) {
            throw new Error('DROPBOX_ACCESS_TOKEN is not set');
        }

        this.dropbox = new Dropbox({ accessToken });
    }

    async uploadRecording(filePath: string, channelName: string): Promise<string> {
        try {
            console.log(`Reading file: ${filePath}`);
            const fileContent = await readFile(filePath);
            console.log(`File size: ${fileContent.length} bytes`);

            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const dropboxPath = `${this.RECORDINGS_PATH}/${channelName}/recording_${timestamp}.mp3`;
            console.log(`Uploading to Dropbox path: ${dropboxPath}`);

            try {
                await this.createFolderIfNotExists(`${this.RECORDINGS_PATH}/${channelName}`);

                const response = await this.dropbox.filesUpload({
                    path: dropboxPath,
                    contents: fileContent,
                    mode: { '.tag': 'add' },
                    autorename: true
                });
                console.log('Upload response:', response);

                if (!response.result.path_display) {
                    throw new Error('Failed to upload file to Dropbox');
                }

                console.log('Creating shared link for:', response.result.path_display);
                const shareResponse = await this.dropbox.sharingCreateSharedLinkWithSettings({
                    path: response.result.path_display,
                    settings: {
                        requested_visibility: { '.tag': 'public' }
                    }
                });
                console.log('Share response:', shareResponse);

                // Delete local file after successful upload
                await unlink(filePath);
                console.log('Local file deleted:', filePath);

                return shareResponse.result.url;
            } catch (uploadError: any) {
                console.error('Dropbox API Error:', {
                    status: uploadError.status,
                    error: uploadError.error,
                    errorSummary: uploadError.error?.error_summary,
                    errorDetails: uploadError.error?.error,
                    response: uploadError.response
                });
                throw uploadError;
            }
        } catch (error) {
            console.error('Error uploading to Dropbox:', error);
            throw error;
        }
    }

    private async createFolderIfNotExists(path: string): Promise<void> {
        try {
            await this.dropbox.filesCreateFolderV2({
                path,
                autorename: false
            });
            console.log(`Created folder: ${path}`);
        } catch (error: any) {
            // Ignore error if folder already exists
            if (error?.error?.error_summary?.includes('path/conflict')) {
                console.log(`Folder already exists: ${path}`);
                return;
            }
            throw error;
        }
    }
} 