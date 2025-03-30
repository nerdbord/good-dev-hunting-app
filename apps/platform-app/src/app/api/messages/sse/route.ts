import { NextRequest } from 'next/server';
import { getAuthorizedUser } from '@/utils/auth.helpers';

// Prevent caching on Vercel
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        // Check user authentication
        const { user } = await getAuthorizedUser();
        if (!user) {
            return new Response('Unauthorized', { status: 401 });
        }

        // Get the application ID from the URL parameters
        const { searchParams } = new URL(request.url);
        const applicationId = searchParams.get('applicationId');

        if (!applicationId) {
            return new Response('Application ID is required', { status: 400 });
        }

        // Create a new readable stream
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            start(controller) {
                // Send an initial connection message
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'connected' })}\n\n`));

                // Keep the connection alive with a heartbeat
                const heartbeatInterval = setInterval(() => {
                    controller.enqueue(encoder.encode(': heartbeat\n\n'));
                }, 30000); // Send heartbeat every 30 seconds

                // Function to send new message events
                const messageHandler = (message: any) => {
                    // We'll trigger this function from our server action
                    if (message.applicationId === applicationId) {
                        controller.enqueue(
                            encoder.encode(`data: ${JSON.stringify(message)}\n\n`)
                        );
                    }
                };

                // Store the function in global state for access from server actions
                if (!global.messageListeners) {
                    global.messageListeners = new Map<string, Set<Function>>();
                }

                // Add this listener to the global map
                if (!global.messageListeners.has(applicationId)) {
                    global.messageListeners.set(applicationId, new Set<Function>());
                }

                // Now we know it's defined because we just ensured it is
                const listeners = global.messageListeners.get(applicationId);
                if (listeners) {
                    listeners.add(messageHandler);
                }

                // Clean up when the client disconnects
                request.signal.addEventListener('abort', () => {
                    clearInterval(heartbeatInterval);
                    const listeners = global.messageListeners?.get(applicationId);
                    if (listeners) {
                        listeners.delete(messageHandler);
                        // Remove the application entry if no listeners remain
                        if (listeners.size === 0 && global.messageListeners) {
                            global.messageListeners.delete(applicationId);
                        }
                    }
                });
            }
        });

        // Return the stream as a response
        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache, no-transform',
                'Connection': 'keep-alive',
            },
        });
    } catch (error) {
        console.error('SSE error:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
} 