import { AddJobTopBar } from '../../../(components)/AddJobTopBar/AddJobTopBar'
import { JobApplicationChat } from '../../../(components)/JobApplicationChat/JobApplicationChat'
import styles from './page.module.scss'
import { ChatBotProvider } from './utils/ChatBotContext'

const NewJobPage = async () => {
  return (
    <ChatBotProvider>
      <div className={styles.wrapper}>
        <AddJobTopBar />
        <JobApplicationChat />
      </div>
    </ChatBotProvider>
  )
}

export default NewJobPage
