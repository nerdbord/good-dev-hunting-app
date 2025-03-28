import { useCallback, useEffect, useRef, useState } from 'react'

interface UseTextareaAnimationProps {
  tagsAnimate: string[]
  onTagChange: (tag: string) => void
  selectedTag: string | null
  mockText: string
}

interface UseTextareaAnimationReturn {
  text: string
  setText: (text: string) => void
  currentTag: string
  isAnimating: boolean
  showPlaceholder: boolean
  setShowPlaceholder: (show: boolean) => void
}

export const useTextareaAnimation = ({
  tagsAnimate,
  onTagChange,
  selectedTag,
  mockText,
}: UseTextareaAnimationProps): UseTextareaAnimationReturn => {
  const [text, setText] = useState('')
  const [currentTag, setCurrentTag] = useState('')
  const [isAnimating, setIsAnimating] = useState(true)
  const [showPlaceholder, setShowPlaceholder] = useState(true)

  // Use refs to track component state and timers
  const isMounted = useRef(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const animationStartedRef = useRef(false)

  // Function to safely clear timeouts and intervals
  const clearTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  // Initialize currentTag when component mounts or tagsAnimate changes
  useEffect(() => {
    if (tagsAnimate.length > 0 && currentTag === '') {
      const initialTag = tagsAnimate[0]
      setCurrentTag(initialTag)

      // Only call onTagChange if the component is mounted
      if (isMounted.current) {
        try {
          onTagChange(initialTag)
        } catch (error) {
          console.error('Error in onTagChange:', error)
        }
      }
    }
  }, [tagsAnimate, currentTag, onTagChange])

  // Function to get random tag excluding the current one
  const getRandomTag = useCallback(
    (currentTag: string) => {
      if (!tagsAnimate || tagsAnimate.length <= 1) return currentTag

      try {
        const availableTags = tagsAnimate.filter((tag) => tag !== currentTag)
        if (!availableTags.length) return tagsAnimate[0]

        const randomIndex = Math.floor(Math.random() * availableTags.length)
        return availableTags[randomIndex]
      } catch (error) {
        console.error('Error in getRandomTag:', error)
        return currentTag
      }
    },
    [tagsAnimate],
  )

  // Set up and clean up component mount/unmount
  useEffect(() => {
    isMounted.current = true
    animationStartedRef.current = false

    return () => {
      isMounted.current = false
      clearTimers()
    }
  }, [clearTimers])

  // Handle selected tag
  useEffect(() => {
    if (selectedTag) {
      setText(mockText)
      setShowPlaceholder(false)
      clearTimers()
    }
  }, [selectedTag, mockText, clearTimers])

  // Animation effect
  useEffect(() => {
    // Don't run animation if selected tag is set or no tags are available
    if (
      selectedTag ||
      !tagsAnimate ||
      tagsAnimate.length === 0 ||
      currentTag === ''
    ) {
      return
    }

    // Prevent multiple animation cycles from starting
    if (animationStartedRef.current) {
      return
    }

    animationStartedRef.current = true
    const ANIMATION_DURATION = 3500 // Total cycle duration
    const DELETE_DURATION = 500 // Duration of delete animation

    // Start the animation cycle
    const startAnimationCycle = () => {
      if (!isMounted.current) return

      try {
        // First set not animating (delete animation)
        setIsAnimating(false)

        // Then after DELETE_DURATION, change tag and start typing animation
        timeoutRef.current = setTimeout(() => {
          if (!isMounted.current) return

          try {
            const newTag = getRandomTag(currentTag)
            setCurrentTag(newTag)

            // Only call onTagChange if component is still mounted
            if (isMounted.current) {
              onTagChange(newTag)
            }

            // Start typing animation
            setIsAnimating(true)
          } catch (error) {
            console.error('Error in animation timeout:', error)
          }
        }, DELETE_DURATION)
      } catch (error) {
        console.error('Error in startAnimationCycle:', error)
      }
    }

    // Set up interval for animation cycle
    intervalRef.current = setInterval(startAnimationCycle, ANIMATION_DURATION)

    // Clean up on unmount or when dependencies change
    return () => {
      clearTimers()
      animationStartedRef.current = false
    }
  }, [
    currentTag,
    getRandomTag,
    onTagChange,
    selectedTag,
    tagsAnimate,
    clearTimers,
  ])

  return {
    text,
    setText,
    currentTag,
    isAnimating,
    showPlaceholder,
    setShowPlaceholder,
  }
}
