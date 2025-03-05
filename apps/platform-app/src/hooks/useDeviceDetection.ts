'use client'
import { useEffect, useState } from 'react'

/**
 * Custom hook for detecting device type and screen width
 * @returns An object with isMobile boolean and current screen width
 */

export const useScreenDetection = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [screenWidth, setScreenWidth] = useState<number>(0)

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth
      setScreenWidth(width)
      setIsMobile(width <= 768)
    }
    checkDeviceType()

    window.addEventListener('resize', checkDeviceType)

    return () => {
      window.removeEventListener('resize', checkDeviceType)
    }
  }, [])

  return { isMobile, screenWidth }
}
