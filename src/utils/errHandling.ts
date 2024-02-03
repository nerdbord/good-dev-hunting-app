import * as Sentry from '@sentry/nextjs'
interface CustomError extends Error {
  message: string
  // Add more custom properties if needed
}

export async function withErrorHandlingAsync<T>(
  asyncFunction: () => Promise<T>,
): Promise<T | null> {
  try {
    const result = await asyncFunction()
    return result
  } catch (error: unknown) {
    throw error as Error
  }
}

type AsyncFunction<T extends any[], R> = (...args: T) => Promise<R>

export const withSentry = <T extends any[], R>(
  asyncFunction: AsyncFunction<T, R>,
): AsyncFunction<T, R> => {
  return async (...args: T): Promise<R> => {
    try {
      return await asyncFunction(...args)
    } catch (error) {
      Sentry.captureException(error)
      throw error
    }
  }
}
