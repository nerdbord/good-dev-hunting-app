import { SpecializationTab } from '@/app/(profile)/(components)/Filters/SpecializationsTabs/SpecializationTabs/SpecializationTab'
import { mappedSpecialization } from '@/app/(profile)/mappers'
import styles from './Filters.module.scss'

export const TabFilters = () => {
  // const handleSpecializationSelect = (option: FilterOption) => {
  //     const isAlreadySelected = jobSpecializationFilter.find(
  //       (o) => o.value === option.value,
  //     )
  //     if (isAlreadySelected) {
  //       setJobSpecializationFilter([])
  //     } else {
  //       setJobSpecializationFilter([option])
  //     }

  //     // router.push(`${pathname}?${createQueryString('position', option.value)}`)
  //   }

  //   const handleAllSpecializationsClick = () => {
  //     setJobSpecializationFilter([])
  //   }

  //   const allTabColors =
  //     jobSpecializationFilter.length === 0 ? '#13CBAA' : '#3d434b'

  const tabs = [{ name: 'All', value: 'all' }, ...mappedSpecialization]

  return (
    <div className={styles.tabs}>
      {/* <SpecializationTab
        //   onClick={handleAllSpecializationsClick}
        name="all"
        // count={filteredProfilesCount}
        //   color={allTabColors}
      >
        All
      </SpecializationTab> */}
      {tabs.map((spec) => {
        // const color = jobSpecializationThemes[spec.value as JobSpecialization]
        return (
          <SpecializationTab
            key={spec.value}
            name={spec.value}
            //   onClick={() => handleSpecializationSelect(spec)}
            // count={specializationCounts[spec.value] || 0}
            // color={color}
          >
            {spec.name}
          </SpecializationTab>
        )
      })}
    </div>
  )
}
