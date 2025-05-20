'use client'

import { motion } from 'framer-motion'
import React from 'react'

type Direction = 'left' | 'right' | 'up' | 'down'

interface AnimatedRevealProps {
  direction?: Direction
  delay?: number
  children: React.ReactNode
  className?: string
  amount?: number // ile elementu musi być widoczne (0–1)
}

const directionVariants = {
  left: { x: -50, opacity: 0 },
  right: { x: 50, opacity: 0 },
  up: { y: 50, opacity: 0 },
  down: { y: -50, opacity: 0 },
}

export const AnimatedReveal: React.FC<AnimatedRevealProps> = ({
  direction = 'left',
  delay = 0,
  children,
  className,
  amount = 0.3,
}) => {
  const initial = directionVariants[direction] || { opacity: 0 }

  return (
    <motion.div
      initial={initial}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      viewport={{ once: true, amount }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
