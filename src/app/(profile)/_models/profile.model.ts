import { approveProfile } from '@/app/(profile)/_actions/mutations/approveProfile'
import { countProfileView } from '@/app/(profile)/_actions/mutations/countProfileView'
import { lockProfile } from '@/app/(profile)/_actions/mutations/lockProfile'
import { publishProfile } from '@/app/(profile)/_actions/mutations/publishProfile'
import { saveMyProfile } from '@/app/(profile)/_actions/mutations/saveMyProfile'
import { unlockProfile } from '@/app/(profile)/_actions/mutations/unlockProfile'
import { unpublishProfile } from '@/app/(profile)/_actions/mutations/unpublishProfile'
import {
  type JobSpecialization,
  type ProfileUpdateParams,
  type TechStack,
} from '@/app/(profile)/profile.types'
import { type ProfileWithRelations } from '@/backend/profile/profile.types'
import {
  type EmploymentType,
  type Profile,
  type PublishingState,
} from '@prisma/client'

export class ProfileModel implements Profile {
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
    const updatedProfile = await approveProfile(this.id)

    return this.sync(updatedProfile)
  }

  async publish() {
    const updatedProfile = await publishProfile(this.id)
    return this.sync(updatedProfile)
  }

  async unpublish() {
    const updatedProfile = await unpublishProfile(this.id)
    return this.sync(updatedProfile)
  }

  async unlock() {
    const updatedProfile = await unlockProfile(this.id)
    return this.sync(updatedProfile)
  }

  async lock() {
    const updatedProfile = await lockProfile(this.id)
    return this.sync(updatedProfile)
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

  static mapProfilesWithRelations(data: ProfileWithRelations[]) {
    return data.map((profile) => new ProfileModel(profile))
  }
}
