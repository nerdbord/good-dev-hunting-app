'use client'
import { Button } from '@gdh/ui-system'
import { useRouter } from 'next/navigation'
import { saveToDatabase } from '../actions/actions'
import styles from './AddJobTopBar.module.scss'
import { useChatBot } from './ChatBotContext'

export function AddJobTopBar() {
  const router = useRouter()
  const chatBot = useChatBot()

  const handleGoToTraditionalForm = async () => {
    await saveToDatabase(chatBot.getFormData())
    router.push('/form')
  }

  return (
    <div className={styles.header}>
      {/* <h1>{t('postJobTitle')}</h1> */}
      <h2 className={styles.title}>Post New Job</h2>
      <Button onClick={handleGoToTraditionalForm} variant="secondary">
        Fill the form in traditional way
      </Button>
    </div>
  )
}
