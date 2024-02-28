import { FilterLists, FilterOption, FiltersProps } from './types'

export const syncFiltersWithUrlParams = (
  params: URLSearchParams,
  filter: FilterOption[],
  paramKey: string,
) => {
  const selectedValues = filter
    .map((option) => option.value.toLowerCase())
    .join(',')

  if (selectedValues) {
    params.set(paramKey.toLowerCase(), selectedValues)
  } else {
    params.delete(paramKey.toLowerCase())
  }
}

export const getFilterOptionsFromParam = (
  paramValue: string | null,
  allOptions: FilterOption[],
): FilterOption[] => {
  if (!paramValue) return []
  const values = paramValue.split(',')
  return allOptions.filter((option) =>
    values.includes(option.value.toLowerCase()),
  )
}

export const setFiltersBasedOnUrlParams = (
  searchParams: URLSearchParams,
  props: FiltersProps,
  filterLists: FilterLists,
) => {
  const params = new URLSearchParams(searchParams)

  return {
    technologyOptions: getFilterOptionsFromParam(
      params.get('tech'),
      props.technologies,
    ),
    seniorityOptions: getFilterOptionsFromParam(
      params.get('exp'),
      filterLists.seniority,
    ),
    jobSpecializationOptions: getFilterOptionsFromParam(
      params.get('spec'),
      props.specializations,
    ),
    availabilityOptions: getFilterOptionsFromParam(
      params.get('avail'),
      filterLists.availability,
    ),
    locationOptions: getFilterOptionsFromParam(
      params.get('loc'),
      props.countries,
    ),
  }
}
