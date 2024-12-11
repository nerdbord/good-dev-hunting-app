import { ApplicationStatus } from '@/app/[locale]/(applications)/_models/application.types'
import styles from './ApplicationTimeline.module.scss'

interface TimelineEvent {
    status: ApplicationStatus
    date: string
    feedback?: string
}

interface ApplicationTimelineProps {
    events: TimelineEvent[]
}

export const ApplicationTimeline = ({ events }: ApplicationTimelineProps) => {
    return (
        <div className={styles.wrapper}>
            <h2>Application Timeline</h2>

            <div className={styles.timeline}>
                {events.map((event, index) => (
                    <div key={index} className={styles.event}>
                        <div className={styles.eventMarker} data-status={event.status} />
                        <div className={styles.eventContent}>
                            <div className={styles.eventHeader}>
                                <span className={styles.eventStatus} data-status={event.status}>
                                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                </span>
                                <span className={styles.eventDate}>
                                    {new Date(event.date).toLocaleDateString()}
                                </span>
                            </div>
                            {event.feedback && (
                                <p className={styles.eventFeedback}>{event.feedback}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
} 