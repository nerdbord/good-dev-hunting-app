import { useEffect, useState } from 'react'

//This hook, when it receives a value of true, will display a modal confirming the user's intention to leave before modifying the router.
//If the user tries to leave the page using the browser interface (back button, refresh, close, etc.), a native confirm box will be displayed.
//Other cases within the application may not be handled correctly.

export const useWarnBeforeLeave = (onLeave?: (url: string) => void) => {
  const [showBrowserAlert, setShowBrowserAlert] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      // Check if the click is on a dropdown or form element - ignore in those cases
      const target = e.target as HTMLElement;
      const currentTarget = e.currentTarget as HTMLAnchorElement;
      
      // Don't intercept clicks on or within dropdowns, buttons, or form elements
      const isFormElement = target.closest('button, select, input, label, .dropdown');
      if (isFormElement) {
        return;
      }
      
      e.preventDefault()
      const href = currentTarget.getAttribute('href') as string

      onLeave && onLeave(href)
    }

    const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
    }

    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault()
    }

    const links = document.querySelectorAll<HTMLAnchorElement>('a[href]')
    if (showModal) {
      links.forEach((link) => {
        link.addEventListener('click', handleLinkClick)
      })
    } else {
      links.forEach((link) => {
        link.removeEventListener('click', handleLinkClick)
      })
    }

    if (showBrowserAlert) {
      window.addEventListener('beforeunload', beforeUnloadHandler)
      window.addEventListener('popstate', handlePopState)
    } else {
      window.removeEventListener('beforeunload', beforeUnloadHandler)
      window.removeEventListener('popstate', handlePopState)
    }

    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', handleLinkClick)
      })
      window.removeEventListener('beforeunload', beforeUnloadHandler)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [showBrowserAlert, showModal])

  return { setShowBrowserAlert, setShowModal }
}
