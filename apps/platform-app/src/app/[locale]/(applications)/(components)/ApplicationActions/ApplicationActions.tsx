'use client'

import { Button, TextArea } from '@gdh/ui-system'
import { ApplicationStatus } from '@/app/[locale]/(applications)/_models/application.types'
import { useState } from 'react'
import styles from './ApplicationActions.module.scss'

interface ApplicationActionsProps {
    applicationId: string
    currentStatus: ApplicationStatus
}

export const ApplicationActions = ({ applicationId, currentStatus }: ApplicationActionsProps) => {
    const [feedback, setFeedback] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [selectedAction, setSelectedAction] = useState<'approve' | 'reject' | null>(null)

    const handleAction = async (newStatus: ApplicationStatus) => {
        if (!feedback.trim()) {
            // TODO: Show error message about required feedback
            return
        }

        try {
            setIsSubmitting(true)
            // await onStatusChange(newStatus, feedback)
            setSelectedAction(null)
            setFeedback('')
        } catch (error) {
            console.error('Failed to update application status:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const isStatusChangeable = currentStatus === 'pending'

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h2>Application Review</h2>
                <div className={styles.statusBadge} data-status={currentStatus}>
                    {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
                </div>
            </div>

            {isStatusChangeable ? (
                <>
                    <div className={styles.actions}>
                        <Button
                            variant="primary"
                            onClick={() => setSelectedAction('approve')}
                            disabled={isSubmitting}
                            className={selectedAction === 'approve' ? styles.selected : ''}
                        >
                            Approve Application
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => setSelectedAction('reject')}
                            disabled={isSubmitting}
                            className={selectedAction === 'reject' ? styles.selected : ''}
                        >
                            Reject Application
                        </Button>
                    </div>

                    {selectedAction && (
                        <div className={styles.feedbackSection}>
                            <TextArea
                                label={`Feedback for ${selectedAction === 'approve' ? 'approval' : 'rejection'}`}
                                placeholder={`Provide feedback about why you're ${selectedAction === 'approve' ? 'approving' : 'rejecting'} this application...`}
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                isDisabled={isSubmitting}
                            />
                            <div className={styles.confirmAction}>
                                <Button
                                    variant="tertiary"
                                    onClick={() => setSelectedAction(null)}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={() => handleAction(selectedAction === 'approve' ? 'approved' : 'rejected')}
                                    disabled={isSubmitting || !feedback.trim()}
                                    loading={isSubmitting}
                                >
                                    Confirm {selectedAction === 'approve' ? 'Approval' : 'Rejection'}
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className={styles.completedStatus}>
                    <p>This application has been {currentStatus}.</p>
                    {/* TODO: Add ability to view feedback history */}
                </div>
            )}
        </div>
    )
} 