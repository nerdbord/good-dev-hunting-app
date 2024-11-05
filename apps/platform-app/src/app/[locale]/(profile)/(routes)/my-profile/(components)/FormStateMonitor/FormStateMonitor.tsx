import LogOutBtn from '@/app/[locale]/(auth)/(components)/LogOutBtn/LogOutBtn'
import { useModal } from '@/contexts/ModalContext'
import { useWarnBeforeLeave } from '@/hooks/useWarnBeforeLeave/useWarnBeforeLeave'
import { useFormikContext } from 'formik'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { ConfirmLeaveModal } from '../ConfirmLeaveModal/ConfirmLeaveModal'
import { ConfirmLogoutModal } from '../ConfirmLogoutModal/ConfirmLogoutModal'

interface FormWarnBeforeLeaveProps {
  showLogoutBtn?: boolean
}
export const FormWarnBeforeLeave = ({
  showLogoutBtn = false,
}: FormWarnBeforeLeaveProps) => {
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
        onConfirm={() => handleConfirm(url)}
      />,
    )
  }
  const { setShowBrowserAlert, setShowModal } = useWarnBeforeLeave(handleLeave)

  const handleConfirm = (url: string) => {
    router.push(url)
    closeModal()
  }

  useEffect(() => {
    setShowBrowserAlert(dirty)
    setShowModal(dirty)
  }, [dirty])

  if (showLogoutBtn) {
    if (!dirty) {
      return <LogOutBtn />
    } else {
      return (
        <LogOutBtn
          onClick={() => {
            if (dirty) {
              setShowBrowserAlert(false)
              showModal(
                <ConfirmLogoutModal
                  onClose={() => {
                    setShowBrowserAlert(true)
                    closeModal()
                  }}
                />,
              )
            }
          }}
        />
      )
    }
  }

  return null
}
