import { useEffect } from 'react'

export const useOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
  settingFnc?: () => void,
) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
        if (settingFnc) {
          settingFnc()
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, callback])
}
export default useOutsideClick
