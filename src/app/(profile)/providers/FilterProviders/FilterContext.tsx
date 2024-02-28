'use client'

import React, { useContext, useState } from 'react'
import { FilterOption, FiltersContext, FiltersContextType } from './types'

export const FiltersProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [jobSpecializationFilter, setJobSpecializationFilter] = useState<
    FilterOption[]
  >([])
  const [technologyFilter, setTechnologyFilter] = useState<FilterOption[]>([])
  const [seniorityFilter, setSeniorityFilter] = useState<FilterOption[]>([])
  const [locationFilter, setLocationFilter] = useState<FilterOption[]>([])
  const [availabilityFilter, setAvailabilityFilter] = useState<FilterOption[]>(
    [],
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
