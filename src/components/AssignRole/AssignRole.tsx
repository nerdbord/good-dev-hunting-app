import Modal from '@/components/Modal/Modal'
import { useModal } from '@/contexts/ModalContext'
import { Button } from '@/components/Button/Button'

import combineClasses from '@/utils/combineClasses'
import styles from './AssignRole.module.scss'
import modalStyles from '@/components/Modal/Modal.module.scss'
import { Inter, IBM_Plex_Sans } from 'next/font/google'

const ibm = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400'] })
const inter = Inter({ subsets: ['latin'], weight: ['500'] })

export default function AssignRole({
  profileId,
  showAssignModal,
}: {
  profileId: string
  showAssignModal: (state: boolean) => void
}) {
  const { isModalVisible, showModal } = useModal()

  if (!isModalVisible) return null
  return (
    <Modal>
      <div className={modalStyles.container}>
        <h4 className={inter.className}>Assign admin role</h4>
        <p className={combineClasses([styles.info, ibm.className])}>
          User will have full moderation permissions and option to assign other
          profiles as admins. <br />
          Are you sure you want to assign this role?
        </p>
        <div className={modalStyles.actionButtons}>
          <Button variant="primary">Yes, assign</Button>
          <Button
            variant={'action'}
            onClick={() => {
              showModal(false)
              showAssignModal(false)
            }}
          >
            No, don't assign
          </Button>
        </div>
      </div>
    </Modal>
  )
}
