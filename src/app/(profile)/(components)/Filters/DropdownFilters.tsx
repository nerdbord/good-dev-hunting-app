import { DropdownFilterMulti } from '@/components/Dropdowns/DropdownFilterMulti/DropdownFilterMulti'

import {
  mappedEmploymentType,
  mappedSeniorityLevel,
} from '@/app/(profile)/mappers'
import { DropdownOption } from '@/components/Dropdowns/DropdownOptionItem/DropdownOptionItem'
import styles from './Filters.module.scss'

export enum JobOfferFiltersEnum {
  technology = 'technology',
  seniority = 'seniority',
  availability = 'availability',
  location = 'location',
}

type DropdownFiltersProps = {
  technologies: DropdownOption[]
  countries: DropdownOption[]
}

export const DropdownFilters = ({
  technologies,
  countries,
}: DropdownFiltersProps) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.features}>
        <DropdownFilterMulti
          text={'Technology'}
          options={technologies}
          jobOfferFilterName={JobOfferFiltersEnum.technology}
          hasSearchInput
        />
        <DropdownFilterMulti
          text={'Seniority'}
          options={mappedSeniorityLevel}
          jobOfferFilterName={JobOfferFiltersEnum.seniority}
        />
        <DropdownFilterMulti
          text={'Availability'}
          options={mappedEmploymentType}
          jobOfferFilterName={JobOfferFiltersEnum.availability}
        />
        <DropdownFilterMulti
          text={'Location'}
          options={countries}
          jobOfferFilterName={JobOfferFiltersEnum.location}
        />
      </div>
      <div className={styles.devType}></div>
    </div>
  )
}
