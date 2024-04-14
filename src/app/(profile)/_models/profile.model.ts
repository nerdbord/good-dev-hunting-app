import { approveProfile } from '@/app/(profile)/_actions/approveProfile'
import { countProfileView } from '@/app/(profile)/_actions/countProfileView'
import { lockProfile } from '@/app/(profile)/_actions/lockProfile'
import { publishProfile } from '@/app/(profile)/_actions/publishProfile'
import { saveMyProfile } from '@/app/(profile)/_actions/saveMyProfile'
import { unlockProfile } from '@/app/(profile)/_actions/unlockProfile'
import { unpublishProfile } from '@/app/(profile)/_actions/unpublishProfile'
import {
  type JobSpecialization,
  type ProfileUpdateParams,
  type TechStack,
} from '@/app/(profile)/profile.types'
import { type BaseModel } from '@/app/types'
import { type ProfileWithRelations } from '@/backend/profile/profile.types'
import {
  type EmploymentType,
  type Profile,
  type PublishingState,
} from '@prisma/client'

export class ProfileModel implements BaseModel<Profile> {
  id: string
  userId: string
  fullName: string
  linkedIn: string | null
  bio: string
  countryId: string
  openForCountryRelocation: boolean
  cityId: string
  openForCityRelocation: boolean
  remoteOnly: boolean
  position: JobSpecialization
  seniority: string
  isOpenForWork: boolean
  employmentTypes: EmploymentType[]
  state: PublishingState
  viewCount: number
  avatarUrl: string | null
  techStack: TechStack
  githubUsername: string | null
  country: string
  city: string
  email: string

  constructor(data: ProfileWithRelations) {
    this.id = data.id
    this.userId = data.userId
    this.fullName = data.fullName
    this.linkedIn = data.linkedIn
    this.bio = data.bio
    this.countryId = data.countryId
    this.openForCountryRelocation = data.openForCountryRelocation
    this.cityId = data.cityId
    this.openForCityRelocation = data.openForCityRelocation
    this.remoteOnly = data.remoteOnly
    this.position = data.position as JobSpecialization
    this.seniority = data.seniority
    this.isOpenForWork = data.isOpenForWork
    this.employmentTypes = data.employmentTypes
    this.state = data.state
    this.viewCount = data.viewCount
    this.country = data.country.name
    this.techStack = data.techStack

    this.techStack = data.techStack
    this.city = data.city.name

    this.avatarUrl = data.user?.avatarUrl || null
    this.githubUsername = data.user?.githubDetails?.username || null
    this.email = data.user.email
  }

  async approve() {
    return await approveProfile(this.id)
  }

  async publish() {
    return await publishProfile(this.id)
  }

  async unpublish() {
    return await unpublishProfile(this.id)
  }

  async unlock() {
    return unlockProfile(this.id)
  }

  async lock() {
    return lockProfile(this.id)
  }

  sync(newModel: Profile) {
    return Object.assign(this, newModel)
  }

  async save(updateParams: ProfileUpdateParams) {
    const savedProfile = await saveMyProfile({
      ...this,
      ...updateParams,
    })

    return this.sync(savedProfile)
  }

  async countView(visitorId: string) {
    const updatedProfile = await countProfileView(this.id, visitorId)

    if (updatedProfile) {
      return this.sync(updatedProfile)
    }
  }
}
