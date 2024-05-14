import { type SenderData } from '@/app/[locale]/(profile)/(components)/ContactForm/ContactBtn/ContactBtn'
import { ToastContextProvider } from '@/contexts/ToastContext'
import ContactForm from '../ContactForm'
import styles from './ContactFormModal.module.scss'

export default function ContactFormModal({
  senderData,
}: {
  senderData: SenderData
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <ToastContextProvider>
          <ContactForm senderData={senderData} />
        </ToastContextProvider>
      </div>
    </div>
  )
}
