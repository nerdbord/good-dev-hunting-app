'use client'
import { fetchTeam } from '@/actions/team/fetchTeam'
import VerticalCard from '@/components/VerticalCard/VerticalCard'
import { ProfileModel } from '@/data/frontend/profile/types'
import { useEffect, useMemo, useState } from 'react'
import styles from './MeetTeam.module.scss'

const MeetTeam = () => {
  const [teamData, setTeamData] = useState<ProfileModel[]>([])
  const content = useMemo(() => {
    console.log(teamData.length)
    if (teamData.length > 0) {
      return teamData
        .reduce((teamCards, profile, index) => {
          const profileCard = <VerticalCard profile={profile} />
          if (index % 4 === 0) {
            const cardsBox = [] as JSX.Element[]
            teamCards.push(cardsBox)
          }
          teamCards[teamCards.length - 1].push(profileCard)
          return teamCards
        }, [] as JSX.Element[][])
        .map((cardsBox) => {
          return <div className={styles.cardsBox}>{...cardsBox}</div>
        })
    } else {
      const cardsBox = (
        <div className={styles.cardsBox}>
          <VerticalCard />
          <VerticalCard />
          <VerticalCard />
          <VerticalCard />
        </div>
      )
      return [cardsBox, cardsBox]
    }
  }, [teamData])
  useEffect(() => {
    fetchTeam().then((data) => {
      console.log(data)
      if (data) {
        setTeamData(data)
      }
    })
  }, [])
  return (
    <section id="MeetTeam" className={styles.wrapper}>
      <div className={styles.titleBox}>
        <p className={styles.sectionName}>WORKING AS A TEAM</p>
        <h2 className={styles.title}>Meet our team</h2>
        <h5 className={styles.subtitle}>Meet passionates behind the scene</h5>
      </div>
      <div className={styles.cardsWrapper}>{...content}</div>
    </section>
  )
}

export default MeetTeam
