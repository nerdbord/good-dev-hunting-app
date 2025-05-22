'use client'

import React, { useEffect, useRef, useState } from 'react'
import './animatedReveal.css'

type Direction = 'left' | 'right' | 'up' | 'down'

interface AnimatedRevealProps {
  direction?: Direction
  delay?: number
  children: React.ReactNode
  className?: string
  amount?: number // how much of the element must be visible (0-1)
}

export const AnimatedReveal: React.FC<AnimatedRevealProps> = ({
  direction = 'left',
  delay = 0,
  children,
  className,
  amount = 0.3,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentRef = ref.current
    if (!currentRef) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          // Add a small timeout to match the delay parameter
          setTimeout(() => {
            setIsVisible(true)
          }, delay * 1000)
          // Once visible, stop observing
          observer.unobserve(currentRef)
        }
      },
      {
        threshold: amount,
      },
    )

    observer.observe(currentRef)

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [amount, delay])

  const getDirectionClass = () => {
    switch (direction) {
      case 'left':
        return 'reveal-from-left'
      case 'right':
        return 'reveal-from-right'
      case 'up':
        return 'reveal-from-up'
      case 'down':
        return 'reveal-from-down'
      default:
        return 'reveal-from-left'
    }
  }

  return (
    <div
      ref={ref}
      className={`animated-reveal ${getDirectionClass()} ${
        isVisible ? 'visible' : ''
      } ${className || ''}`}
    >
      {children}
    </div>
  )
}
