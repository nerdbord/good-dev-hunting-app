'use client'

import { useState } from 'react'
import styles from './ApplicationDetails.module.scss'

interface TimeSlot {
  id: string
  time: string
  date: string
}

interface JobOffer {
  title: string
  company: string
  location: string
  requirements: string[]
  workMode: string
  salaryRange: { min: number; max: number }
  experienceLevel: string
}

interface Candidate {
  name: string
  position: string
  location: string
  skills: string[]
  languages: string[]
  bio: string
  cv: string
  willingToRelocate: boolean
  preferredWorkMode: string
  expectedSalary: number
  experienceLevel: string
}

const mockTimeSlots: TimeSlot[] = [
  { id: '1', time: '10:00', date: '2024-01-02' },
  { id: '2', time: '11:00', date: '2024-01-02' },
  { id: '3', time: '14:00', date: '2024-01-02' },
  { id: '4', time: '15:00', date: '2024-01-02' },
  { id: '5', time: '10:00', date: '2024-01-03' },
  { id: '6', time: '11:00', date: '2024-01-03' },
]

const jobOffer: JobOffer = {
  title: 'Intern Frontend Developer',
  company: 'TechCorp',
  location: 'Wrocław, Poland',
  requirements: [
    'Next.js',
    'React.js',
    'TypeScript',
    'Responsive Design',
    'Git',
    'English (B2+)',
  ],
  //   workMode: 'Hybrid',
  workMode: 'Remote',
  salaryRange: { min: 4000, max: 6000 },
  experienceLevel: 'Junior',
}

const candidate: Candidate = {
  name: 'Michal Czajkowski',
  position: 'Intern Frontend Developer',
  location: 'Wrocław, Poland',
  skills: ['Next.js', 'React.js', 'JavaScript', 'HTML', 'CSS'],
  languages: ['English', 'Polish'],
  bio: 'Passionate frontend developer with a keen eye for design and user experience. Looking for an opportunity to grow and contribute to innovative projects.',
  cv: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  willingToRelocate: true,
  preferredWorkMode: 'Remote',
  expectedSalary: 4500,
  experienceLevel: 'Junior',
}

function calculateMatchPercentage(
  jobOffer: JobOffer,
  candidate: Candidate,
): { percentage: number; details: { [key: string]: boolean } } {
  const skillsMatch =
    jobOffer.requirements.filter((skill) =>
      candidate.skills.some((candidateSkill) =>
        candidateSkill.toLowerCase().includes(skill.toLowerCase()),
      ),
    ).length / jobOffer.requirements.length

  const locationMatch =
    jobOffer.location === candidate.location || candidate.willingToRelocate
  const workModeMatch =
    jobOffer.workMode.toLowerCase() ===
    candidate.preferredWorkMode.toLowerCase()
  const salaryMatch =
    candidate.expectedSalary >= jobOffer.salaryRange.min &&
    candidate.expectedSalary <= jobOffer.salaryRange.max
  const experienceLevelMatch =
    jobOffer.experienceLevel.toLowerCase() ===
    candidate.experienceLevel.toLowerCase()

  const details = {
    skills: skillsMatch >= 0.5,
    location: locationMatch,
    workMode: workModeMatch,
    salary: salaryMatch,
    experienceLevel: experienceLevelMatch,
  }

  const overallPercentage =
    Object.values(details).filter(Boolean).length / Object.keys(details).length

  return {
    percentage: Math.round(overallPercentage * 100),
    details,
  }
}

export default function ApplicationDetails() {
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const [rejectReason, setRejectReason] = useState('')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [showCVModal, setShowCVModal] = useState(false)

  const { percentage: matchPercentage, details: matchDetails } =
    calculateMatchPercentage(jobOffer, candidate)

  const handleReject = async () => {
    try {
      setIsLoading(true)
      setError(null)
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      setSuccessMessage('Application rejected successfully')
      setShowRejectModal(false)
      setRejectReason('')
    } catch (err) {
      setError('Failed to reject application. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAccept = async () => {
    if (!selectedTimeSlot) return
    try {
      setIsLoading(true)
      setError(null)
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      setSuccessMessage('Interview scheduled successfully')
      setShowAcceptModal(false)
      setSelectedTimeSlot(null)
    } catch (err) {
      setError('Failed to schedule interview. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Application Details</h1>
        <div className={styles.actionBar}>
          <button
            className={`${styles.actionButton} ${styles.acceptButton}`}
            onClick={() => setShowAcceptModal(true)}
            aria-label="Accept Application"
          >
            Schedule interview
          </button>
          <button
            className={`${styles.actionButton} ${styles.rejectButton}`}
            onClick={() => setShowRejectModal(true)}
            aria-label="Reject Application"
          >
            Reject
          </button>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.applicantSection}>
          <div className={styles.applicantInfo}>
            <img
              src="/placeholder.svg?height=80&width=80"
              alt=""
              className={styles.profileImage}
            />
            <div>
              <h2 className={styles.applicantName}>{candidate.name}</h2>
              <p className={styles.applicantPosition}>{candidate.position}</p>
              <div className={styles.applicationStatus}>
                <span className={styles.statusIndicator}></span>
                Pending
              </div>
            </div>
          </div>

          {/* <div className={styles.matchPercentage}>
            <span className={styles.matchValue}>{matchPercentage}%</span>
            <span className={styles.matchLabel}>Match</span>
          </div> */}

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Candidate Details</h3>
            <div className={styles.detailGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Location</span>
                <span className={styles.detailValue}>{candidate.location}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Willing to Relocate</span>
                <span className={styles.detailValue}>
                  {candidate.willingToRelocate ? 'Yes' : 'No'}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Preferred Work Mode</span>
                <span className={styles.detailValue}>
                  {candidate.preferredWorkMode}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Expected Salary</span>
                <span className={styles.detailValue}>
                  {candidate.expectedSalary} PLN/month
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Experience Level</span>
                <span className={styles.detailValue}>
                  {candidate.experienceLevel}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Tech Stack</h3>
            <div className={styles.tagList}>
              {candidate.skills.map((skill, index) => (
                <span key={index} className={styles.tag}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Languages</h3>
            <div className={styles.tagList}>
              {candidate.languages.map((language, index) => (
                <span key={index} className={styles.tag}>
                  {language}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Bio</h3>
            <p className={styles.bio}>{candidate.bio}</p>
          </div>

          <div className={styles.quickActions}>
            <button
              className={styles.actionChip}
              onClick={() => setShowCVModal(true)}
            >
              View CV
            </button>
            <button className={styles.actionChip}>Download CV</button>
            <button className={styles.actionChip}>GitHub</button>
            <button className={styles.actionChip}>LinkedIn</button>
          </div>
        </div>

        <div className={styles.jobOfferSection}>
          <h3 className={styles.sectionTitle}>Job Offer</h3>
          <p className={styles.jobTitle}>{jobOffer.title}</p>
          <p className={styles.jobCompany}>{jobOffer.company}</p>
          <div className={styles.jobDetails}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Location:</span>
              <span className={styles.detailValue}>
                {jobOffer.location}
                {matchDetails.location && (
                  <span className={styles.matchIndicator}>Match</span>
                )}
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Work Mode:</span>
              <span className={styles.detailValue}>
                {jobOffer.workMode}
                {matchDetails.workMode && (
                  <span className={styles.matchIndicator}>Match</span>
                )}
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Salary Range:</span>
              <span className={styles.detailValue}>
                {jobOffer.salaryRange.min} - {jobOffer.salaryRange.max}{' '}
                PLN/month
                {matchDetails.salary && (
                  <span className={styles.matchIndicator}>Match</span>
                )}
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Experience Level:</span>
              <span className={styles.detailValue}>
                {jobOffer.experienceLevel}
                {matchDetails.experienceLevel && (
                  <span className={styles.matchIndicator}>Match</span>
                )}
              </span>
            </div>
          </div>
          <div className={styles.jobRequirements}>
            <h4 className={styles.subsectionTitle}>Requirements</h4>
            <ul className={styles.requirementsList}>
              {jobOffer.requirements.map((req, index) => (
                <li key={index} className={styles.requirementItem}>
                  {req}
                  {candidate.skills.some((skill) =>
                    skill.toLowerCase().includes(req.toLowerCase()),
                  ) && <span className={styles.matchIndicator}>Match</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      <div className={styles.floatingActionButtons}>
        <button
          className={`${styles.fab} ${styles.fabAccept}`}
          onClick={() => setShowAcceptModal(true)}
          aria-label="Accept Application"
        >
          Accept
        </button>
        <button
          className={`${styles.fab} ${styles.fabReject}`}
          onClick={() => setShowRejectModal(true)}
          aria-label="Reject Application"
        >
          Reject
        </button>
      </div>

      {isLoading && <div className={styles.loadingOverlay}>Processing...</div>}
      {error && <div className={styles.error}>{error}</div>}
      {successMessage && <div className={styles.success}>{successMessage}</div>}

      {showRejectModal && (
        <div className={styles.modal} role="dialog" aria-modal="true">
          <h3 className={styles.modalTitle}>Reject Application</h3>
          <textarea
            className={styles.textarea}
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Please provide a reason for rejection..."
          />
          <div className={styles.modalButtons}>
            <button
              className={styles.modalButton}
              onClick={handleReject}
              disabled={!rejectReason || isLoading}
            >
              Confirm Rejection
            </button>
            <button
              className={styles.modalButton}
              onClick={() => setShowRejectModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showAcceptModal && (
        <div className={styles.modal} role="dialog" aria-modal="true">
          <h3 className={styles.modalTitle}>Schedule Interview</h3>
          <div className={styles.timeSlots}>
            {mockTimeSlots.map((slot) => (
              <button
                key={slot.id}
                className={`${styles.timeSlot} ${
                  selectedTimeSlot === slot.id ? styles.selected : ''
                }`}
                onClick={() => setSelectedTimeSlot(slot.id)}
              >
                {slot.date.split('-')[2]}/{slot.date.split('-')[1]}
                <br />
                {slot.time}
              </button>
            ))}
          </div>
          <div className={styles.modalButtons}>
            <button
              className={styles.modalButton}
              onClick={handleAccept}
              disabled={!selectedTimeSlot || isLoading}
            >
              Confirm Schedule
            </button>
            <button
              className={styles.modalButton}
              onClick={() => setShowAcceptModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showCVModal && (
        <div className={styles.modal} role="dialog" aria-modal="true">
          <h3 className={styles.modalTitle}>Curriculum Vitae</h3>
          <div className={styles.cvContent}>{candidate.cv}</div>
          <div className={styles.modalButtons}>
            <button
              className={styles.modalButton}
              onClick={() => setShowCVModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
