'use client'
import { useEffect, useState } from 'react'

export const useMediaQuery = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mobileViewport = 768

    setIsMobile(
      typeof window !== 'undefined' && mobileViewport
        ? window.innerWidth <= mobileViewport
        : false,
    )
  }, [])

  return isMobile
}
