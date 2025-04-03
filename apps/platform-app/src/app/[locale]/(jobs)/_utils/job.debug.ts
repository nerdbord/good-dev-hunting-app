export function logJobStateChange(jobId: string, oldState: string, newState: string, action: string) {
  console.log(`[Job State Debug] Job ${jobId}: ${action}`, {
    oldState,
    newState,
    timestamp: new Date().toISOString()
  });
}

export function logJobUpdate(jobId: string, changes: Record<string, any>) {
  console.log(`[Job Update Debug] Job ${jobId} updated:`, {
    changes,
    timestamp: new Date().toISOString()
  });
}

export function logJobPublish(jobId: string, result: any) {
  console.log(`[Job Publish Debug] Job ${jobId} publish attempt:`, {
    result,
    timestamp: new Date().toISOString()
  });
} 