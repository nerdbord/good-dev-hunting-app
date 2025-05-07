import { useEffect, useState } from 'react'

interface UseResponsiveReturn {
  isMobile: boolean
}

export const useResponsive = (): UseResponsiveReturn => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const isMobileNow = window.innerWidth <= 768
      setIsMobile(isMobileNow)
    }

    // Check on initial render
    if (typeof window !== 'undefined') {
      checkMobile()
    }

    // Add event listener for resize
    window.addEventListener('resize', checkMobile)

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return { isMobile }
}
