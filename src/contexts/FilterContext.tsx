'use client'
import React, { createContext, useState, useContext } from 'react'
import { DropdownOption } from '@/components/Dropdowns/DropdownFilter/DropdownFilter'

export type FiltersContextType = {
  jobSpecializationFilter: DropdownOption[]
  setJobSpecializationFilter: (value: DropdownOption[]) => void
  technologyFilter: DropdownOption[]
  setTechnologyFilter: (value: DropdownOption[]) => void
  seniorityFilter: DropdownOption
  setSeniorityFilter: (value: DropdownOption) => void
  availabilityFilter: DropdownOption
  setAvailabilityFilter: (value: DropdownOption) => void
  locationFilter: DropdownOption
  setLocationFilter: (value: DropdownOption) => void
}

export const FiltersContext = createContext<FiltersContextType | undefined>(
  undefined,
)

export const initialDropdownOption: DropdownOption = {
  name: '',
  value: '',
}

export const FiltersProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [jobSpecializationFilter, setJobSpecializationFilter] = useState<
    DropdownOption[]
  >([])
  const [technologyFilter, setTechnologyFilter] = useState<DropdownOption[]>([])
  const [seniorityFilter, setSeniorityFilter] = useState<DropdownOption>(
    initialDropdownOption,
  )
  const [locationFilter, setLocationFilter] = useState<DropdownOption>(
    initialDropdownOption,
  )
  const [availabilityFilter, setAvailabilityFilter] = useState<DropdownOption>(
    initialDropdownOption,
  )

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
