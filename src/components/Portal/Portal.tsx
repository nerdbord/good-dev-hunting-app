import { useRef, useEffect, useState, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

type PortalProps = {
  selector: string
}
export default function Portal({
  children,
  selector,
}: PropsWithChildren<PortalProps>) {
  const ref = useRef<HTMLElement | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector(selector)
    setMounted(true)
  }, [selector])

  return mounted && ref.current ? createPortal(children, ref.current) : null
}
