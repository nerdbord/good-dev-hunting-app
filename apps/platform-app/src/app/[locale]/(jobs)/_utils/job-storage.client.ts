'use client'

// Constants for localStorage keys
const PENDING_PUBLISH_JOB_ID = 'pendingPublishJobId'

/**
 * Store a job ID that needs to be published after sign-in
 */
export const storePendingPublishJob = (jobId: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(PENDING_PUBLISH_JOB_ID, jobId)
  }
}

/**
 * Get the pending job ID that needs to be published
 */
export const getPendingPublishJob = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(PENDING_PUBLISH_JOB_ID)
  }
  return null
}

/**
 * Clear the pending job ID after it has been published
 */
export const clearPendingPublishJob = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(PENDING_PUBLISH_JOB_ID)
  }
}
