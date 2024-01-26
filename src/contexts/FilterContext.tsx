'use client'
import { EmploymentType } from '@prisma/client'
import React, { createContext, useContext, useState } from 'react'

export type FiltersContextType = {
  jobSpecializationFilter: string[]
  setJobSpecializationFilter: (value: string[]) => void
  technologyFilter: string[]
  setTechnologyFilter: (value: string[]) => void
  seniorityFilter: string[]
  setSeniorityFilter: (value: string[]) => void
  availabilityFilter: EmploymentType[]
  setAvailabilityFilter: (value: EmploymentType[]) => void
  locationFilter: string[]
  setLocationFilter: (value: string[]) => void
}

export const FiltersContext = createContext<FiltersContextType | undefined>(
  undefined,
)

export const FiltersProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [jobSpecializationFilter, setJobSpecializationFilter] = useState<
    string[]
  >([])
  const [technologyFilter, setTechnologyFilter] = useState<string[]>([])
  const [seniorityFilter, setSeniorityFilter] = useState<string[]>([])
  const [locationFilter, setLocationFilter] = useState<string[]>([])
  const [availabilityFilter, setAvailabilityFilter] = useState<
    EmploymentType[]
  >([])

  return (
    <FiltersContext.Provider
      value={{
        jobSpecializationFilter,
        setJobSpecializationFilter,
        technologyFilter,
        setTechnologyFilter,
        seniorityFilter,
        setSeniorityFilter,
        availabilityFilter,
        setAvailabilityFilter,
        locationFilter,
        setLocationFilter,
      }}
    >
      {children}
    </FiltersContext.Provider>
  )
}

export const useFilters = (): FiltersContextType => {
  const context = useContext(FiltersContext)
  if (!context) {
    throw new Error('useFilters must be used within a FiltersProvider')
  }
  return context
}
