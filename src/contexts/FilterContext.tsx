'use client'
import {
  mappedEmploymentType,
  mappedSeniorityLevel,
} from '@/app/(profile)/mappers'
import { JobSpecialization } from '@/app/(profile)/types'
import { DropdownOption } from '@/components/Dropdowns/DropdownFilter/DropdownFilter'
import React, { createContext, useContext, useState } from 'react'

export type FiltersContextType = {
  jobSpecializationFilter: FilterOption[]
  setJobSpecializationFilter: (value: FilterOption[]) => void
  technologyFilter: FilterOption[]
  setTechnologyFilter: (value: FilterOption[]) => void
  seniorityFilter: FilterOption[]
  setSeniorityFilter: (value: FilterOption[]) => void
  availabilityFilter: FilterOption[]
  setAvailabilityFilter: (value: FilterOption[]) => void
  locationFilter: FilterOption[]
  setLocationFilter: (value: FilterOption[]) => void
}

export interface FilterOption extends DropdownOption {}

export const FiltersContext = createContext<FiltersContextType | undefined>(
  undefined,
)

export const initialFilterOption: FilterOption = {
  name: '',
  value: '',
}

export interface State {
  technology: DropdownOption
  seniority: DropdownOption
  availability: DropdownOption
  location: DropdownOption
}

export enum JobOfferStaticFiltersEnum {
  seniority = 'seniority',
  availability = 'availability',
}

export enum JobOfferFiltersEnum {
  technology = 'technology',
  seniority = 'seniority',
  availability = 'availability',
  location = 'location',
}

export const JobOfferFilters: State = {
  technology: initialFilterOption,
  seniority: initialFilterOption,
  availability: initialFilterOption,
  location: initialFilterOption,
}

export const jobSpecializationOptions: Record<
  JobSpecialization,
  DropdownOption
> = {
  [JobSpecialization.Frontend]: {
    name: 'Frontend',
    value: JobSpecialization.Frontend,
  },
  [JobSpecialization.Backend]: {
    name: 'Backend',
    value: JobSpecialization.Backend,
  },
  [JobSpecialization.Fullstack]: {
    name: 'Fullstack',
    value: JobSpecialization.Fullstack,
  },
}

export type FilterLists = {
  [key in JobOfferStaticFiltersEnum]: DropdownOption[]
}
export const filterLists: FilterLists = {
  seniority: mappedSeniorityLevel,
  availability: mappedEmploymentType,
}

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
