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
    if (error instanceof Error) {
      // Handle the error here
      console.error('An error occurred:', error)

      return null
    } else {
      // Handle non-Error type errors
      console.error('An unknown error occurred:', error)
      return null
    }
  }
}
