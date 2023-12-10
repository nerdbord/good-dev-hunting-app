'use client'
import React, { useState, useEffect } from 'react'
import styles from './TechStackSuggestion.module.scss'
import technologies from '@/data/frontend/technologies/data'

interface DropdownTechStackProps {
  input: string
  onTechSelect: (tech: string) => void
}

const DropdownTechStack: React.FC<DropdownTechStackProps> = ({
  input,
  onTechSelect,
}) => {
  const [filteredTech, setFilteredTech] = useState<string[]>([])

  useEffect(() => {
    if (input) {
      const filtered = technologies.filter((tech) =>
        tech.toLowerCase().includes(input.toLowerCase()),
      )
      setFilteredTech(filtered)
    } else {
      setFilteredTech([])
    }
  }, [input])

  return (
    <div className={styles.suggestions}>
      {filteredTech.map((tech, index) => (
        <div
          className={styles.suggestionItem}
          key={index}
          onClick={() => onTechSelect(tech)}
        >
          {tech}
        </div>
      ))}
    </div>
  )
}

export default DropdownTechStack
