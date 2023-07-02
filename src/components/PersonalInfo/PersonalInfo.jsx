'use client'
import React from 'react'
import styles from './PersonalInfo.module.scss'
import ImportantIcon from '@/assets/icons/ImportantIcon'

const PersonalInfo = () => {
  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <div>Personal Information</div>
            <div className={styles.personalInfo}>Share personal information to let the recruiters get to know you. </div>
        </div>
        <div className={styles.right}>
             <div className={styles.formItem}>
                <div className={styles.formTitle}>Full name</div>
                 <input className={styles.formInput} type="text" placeholder="eg. Anna Oxford"/>
             </div>
             <div className={styles.formItem}>
                <div className={styles.formTitle}>
                    Contact email 
                    <ImportantIcon/>
                </div>
                 <input className={styles.formInput} type="text" placeholder="eg. karolina@gmail.com"/>
             </div>
             <div className={styles.formItem}>
                <div className={styles.formTitle}>LinkedIn</div>
                 <input className={styles.formInput} type="text" placeholder="Paste link to you linkedin profile"/>
             </div>
             <div className={styles.formItem}>
                <div className={styles.formTitle}>
                    Bio
                    <ImportantIcon/>
                </div>
                 <textarea className={styles.formTextarea} type="text" placeholder="Introduce yourself with few senteses"/>
                 <div className={styles.lettersCount}>0 / 1500 characters</div>
             </div>
        </div>
    </div>
  )
}

export default PersonalInfo