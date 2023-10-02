'use client'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { withErrorHandlingAsync } from '@/utils/errHandling'

export const useAsyncAction = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [isPending, startTransition] = useTransition()
  const [isCalledOnce, setIsCalledOnce] = useState(false)

  const router = useRouter()
  const runAsync = async <T>(asyncFunction: (...args: any) => Promise<T>) => {
    try {
      setIsCalledOnce(true)
      setLoading(true)
      setError(null)
      await withErrorHandlingAsync(asyncFunction)

      setLoading(false)
      startTransition(() => {
        // Refresh the current route and fetch new data from the server without
        // losing client-side browser or React state.
        router.refresh()
      })
    } catch (e) {
      if (e instanceof Error) {
        setError(e)
      }
    }
  }

  return { runAsync, loading: loading || isPending, error, isCalledOnce }
}
