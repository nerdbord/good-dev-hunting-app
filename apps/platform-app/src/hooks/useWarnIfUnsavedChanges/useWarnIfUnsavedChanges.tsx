import { useModal } from '@/contexts/ModalContext'
import { type NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { ConfirmLeaveModal } from './ConfirmLeaveModal/ConfirmLeaveModal'

//This hook, when it receives a value of true, will display a modal confirming the user's intention to leave before modifying the router.
//If the user tries to leave the page using the browser interface (back button, refresh, close, etc.), a native confirm box will be displayed.
//Other cases within the application may not be handled correctly.

export const useWarnIfUnsavedChanges = (unsaved: boolean) => {
  const router = useRouter()
  const { closeModal, showModal } = useModal()

  useEffect(() => {
    const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
    }

    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault()
    }

    if (unsaved) {
      window.addEventListener('beforeunload', beforeUnloadHandler)
      window.addEventListener('popstate', handlePopState)
    } else {
      window.removeEventListener('beforeunload', beforeUnloadHandler)
      window.removeEventListener('popstate', handlePopState)
    }

    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [unsaved])

  useEffect(() => {
    const originalPush = router.push

    router.push = (url: string, options?: NavigateOptions) => {
      if (unsaved) {
        showModal(
          <ConfirmLeaveModal
            onClose={closeModal}
            onConfirm={() => {
              closeModal()
              originalPush(url, options)
            }}
          />,
        )
      } else {
        originalPush(url, options)
      }
    }

    return () => {
      router.push = originalPush
    }
  }, [router, unsaved])

  return { closeModal }
}
