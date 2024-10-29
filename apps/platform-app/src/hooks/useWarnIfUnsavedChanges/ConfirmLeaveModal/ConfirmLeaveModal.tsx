'use client'
import { Button } from '@gdh/ui-system'

import modalStyles from './modalStyles.module.scss'

export function ConfirmLeaveModal({
  onConfirm,
  onClose,
}: {
  onConfirm: () => void
  onClose: () => void
}) {
  return (
    <div className={modalStyles.container}>
      <h4>Finish your Profile to Save</h4>
      <p className={modalStyles.description}>
        Your profile isn’t fully completed yet. To save your changes please fill
        in all fields. If you leave the page now, your progress will be lost.
      </p>
      <div className={modalStyles.actionButtons}>
        <Button variant={'secondary'} onClick={() => onConfirm()}>
          Leave Page
        </Button>
        <Button variant={'primary'} onClick={() => onClose()}>
          Finish profile
        </Button>
      </div>
    </div>
  )
}
