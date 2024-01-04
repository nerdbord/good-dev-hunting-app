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
