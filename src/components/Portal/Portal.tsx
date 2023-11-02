import { useRef, useEffect, useState, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

export default function Portal({
  children,
  selector,
}: PropsWithChildren<{ selector: string }>) {
  const ref = useRef<Element | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector(selector)
    setMounted(true)
  }, [selector])

  return mounted && ref.current ? createPortal(children, ref.current) : null
}
