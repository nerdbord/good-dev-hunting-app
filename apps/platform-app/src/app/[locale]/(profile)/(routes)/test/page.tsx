'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useWarnIfUnsavedChanges } from './useWarn'

export default function MyPage() {
  const router = useRouter()
  const [pendingRoute, setPendingRoute] = useState<string | null>(null)
  const [isConfirming, setIsConfirming] = useState(false)
  const [isBackNavigation, setIsBackNavigation] = useState(false)
  useWarnIfUnsavedChanges(true)

  // Funkcja do potwierdzenia nawigacji
  const confirmNavigation = (route: string) => {
    setPendingRoute(route)
    setIsConfirming(true)
  }

  const handleConfirm = () => {
    if (pendingRoute) {
      if (isBackNavigation) {
        window.history.back() // Ręczna nawigacja wstecz
      } else {
        router.push(pendingRoute) // Standardowa nawigacja
      }
      resetNavigationState()
    }
  }

  const handleCancel = () => {
    setIsConfirming(false)
    setPendingRoute(null)
    if (isBackNavigation) {
      window.history.pushState(null, '', window.location.pathname) // Przywrócenie aktualnej ścieżki
    }
  }

  const resetNavigationState = () => {
    setIsConfirming(false)
    setPendingRoute(null)
    setIsBackNavigation(false) // Zresetuj stan wstecznej nawigacji
  }

  // Obsługa kliknięć w linki
  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string,
  ) => {
    event.preventDefault()
    confirmNavigation(href)
  }

  // Obsługa wstecznego przycisku
  useEffect(() => {
    const handlePopState = () => {
      confirmNavigation(window.location.pathname)
      setIsBackNavigation(true) // Oznacz jako wsteczna nawigacja
      console.log(
        `location: ${document.location}, state: ${JSON.stringify(event.state)}`,
      )
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  return (
    <>
      <div>My Page</div>

      {/* Przykładowe linki */}
      <a href="/home" onClick={(e) => handleLinkClick(e, '/home')}>
        Go to Home
      </a>
      <a href="/about" onClick={(e) => handleLinkClick(e, '/about')}>
        Go to About
      </a>

      {/* Modal z potwierdzeniem */}
      {isConfirming && (
        <div className="confirmation-modal">
          <p>Are you sure you want to leave this page?</p>
          <button onClick={handleConfirm}>Yes</button>
          <button onClick={handleCancel}>No</button>
        </div>
      )}
    </>
  )
}
