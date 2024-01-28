import { getTechnologies } from '@/backend/technology/technology.service'
import { mapTechnologies } from '@/data/frontend/profile/mappers'
import Filters from './Filters'

export default async function FiltersWithData() {
  const technologies = mapTechnologies(await getTechnologies())
  return <Filters technologies={technologies} />
}
