export function logVerificationModal(jobId: string, isOpen: boolean, result?: any) {
  console.log(`[Verification Modal Debug] Job ${jobId}:`, {
    isOpen,
    result,
    timestamp: new Date().toISOString()
  });
}

export function logSuccessModal(jobId: string, isOpen: boolean, jobState?: string) {
  console.log(`[Success Modal Debug] Job ${jobId}:`, {
    isOpen,
    jobState,
    timestamp: new Date().toISOString()
  });
}

export function logPublishFlow(jobId: string, step: string, data?: any) {
  console.log(`[Publish Flow Debug] Job ${jobId} - ${step}:`, {
    data,
    timestamp: new Date().toISOString()
  });
} 