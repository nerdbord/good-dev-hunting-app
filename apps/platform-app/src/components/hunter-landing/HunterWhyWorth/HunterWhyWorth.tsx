'use client'

import { useState } from 'react'
import styles from './HunterWhyWorth.module.scss'

const backgroundDefault = '/Background.svg'
const backgroundOne = '/Background1.svg'
const backgroundTwo = '/Background2.svg'

type Props = {}

export const HunterWhyWorth = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState<number>(0)

  const getBackgroundImage = () => {
    switch (selectedOption) {
      case 0:
        return backgroundDefault
      case 1:
        return backgroundOne
      case 2:
        return backgroundTwo
      default:
        return backgroundDefault
    }
  }

  const handleOptionClick = (option: number) => {
    setSelectedOption(option)
  }

  return (
    <div className={styles.fullWidthWrapper}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Dlaczego warto korzystać z DevHunting?</h2>

        <div className={styles.contentContainer}>
          <div className={styles.textContainer}>
            <div
              className={`${styles.reason} ${
                selectedOption === 0 ? styles.selected : ''
              }`}
              onClick={() => handleOptionClick(0)}
            >
              <h3 className={styles.reasonTitle}>Całkowicie za darmo</h3>
              <p className={styles.reasonDescription}>
                Dodaj swoje zlecenie bez opłat i otrzymaj oferty od specjalistów
                IT.
              </p>
            </div>

            <div
              className={`${styles.reason} ${
                selectedOption === 1 ? styles.selected : ''
              }`}
              onClick={() => handleOptionClick(1)}
            >
              <h3 className={styles.reasonTitle}>Prosty i szybki proces</h3>
              <p className={styles.reasonDescription}>
                Nie trać czasu na poszukiwania - programiści sami zgłoszą się do
                Ciebie z dostosowanymi propozycjami.
              </p>
            </div>

            <div
              className={`${styles.reason} ${
                selectedOption === 2 ? styles.selected : ''
              }`}
              onClick={() => handleOptionClick(2)}
            >
              <h3 className={styles.reasonTitle}>
                Nie musisz znać technologii
              </h3>
              <p className={styles.reasonDescription}>
                Opisz swój pomysł, a AI przekształci go w brief projektowy dla
                odpowiednich ekspertów.
              </p>
            </div>
          </div>

          <div
            className={styles.imageContainer}
            style={{ backgroundImage: `url(${getBackgroundImage()})` }}
          />
        </div>
      </div>
    </div>
  )
}
