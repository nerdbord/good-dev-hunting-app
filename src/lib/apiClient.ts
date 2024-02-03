/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpClient } from '@/lib/httpClient'
import { PutBlobResult } from '@vercel/blob'

export const apiClient = {
  userPhotoUpload: async (file: File) => {
    try {
      const { url } = await httpClient.postPhoto<PutBlobResult>(
        '/api/files',
        file,
      )
      return url
    } catch (error) {
      throw new Error(error as string)
    }
  },
}
