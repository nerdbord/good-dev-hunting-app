import LogOutBtn from '@/app/[locale]/(auth)/(components)/LogOutBtn/LogOutBtn'
import { useModal } from '@/contexts/ModalContext'
import { useWarnBeforeLeave } from '@/hooks/useWarnBeforeLeave/useWarnBeforeLeave'
import { useFormikContext } from 'formik'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { ConfirmLeaveModal } from '../ConfirmLeaveModal/ConfirmLeaveModal'
import { ConfirmLogoutModal } from '../ConfirmLogoutModal/ConfirmLogoutModal'

export const FormNavigationWarning = () => {
  const { dirty } = useFormikContext()
  const { closeModal, showModal } = useModal()
  const router = useRouter()

  const handleLeave = (url: string) => {
    setShowBrowserAlert(false)
    showModal(
      <ConfirmLeaveModal
        onClose={() => {
          setShowBrowserAlert(true)
          closeModal()
        }}
        onConfirm={() => {
          router.push(url)
          closeModal()
        }}
      />,
    )
  }

  const { setShowBrowserAlert, setShowModal } = useWarnBeforeLeave(handleLeave)

  useEffect(() => {
    setShowBrowserAlert(dirty)
    setShowModal(dirty)
  }, [dirty, setShowBrowserAlert, setShowModal])

  return null
}

export const FormLogoutWarning = () => {
  const { dirty } = useFormikContext()
  const { closeModal, showModal } = useModal()
  const { setShowBrowserAlert } = useWarnBeforeLeave()

  if (!dirty) {
    return <LogOutBtn />
  }

  return (
    <LogOutBtn
      onClick={() => {
        setShowBrowserAlert(false)
        showModal(
          <ConfirmLogoutModal
            onClose={() => {
              setShowBrowserAlert(true)
              closeModal()
            }}
          />,
        )
      }}
    />
  )
}
