import { assignRole } from '@/app/(auth)/_actions/mutations/assignRole'
import { importAvatarFromGithub } from '@/app/(auth)/_actions/mutations/importAvatarFromGithub'
import { unassignRole } from '@/app/(auth)/_actions/mutations/unassignRole'
import { updateMyAvatar } from '@/app/(auth)/_actions/mutations/updateMyAvatar'
import { type UserWithRelations } from '@/backend/user/user.types'
import { type Role, type User } from '@prisma/client'

export class UserModel implements User {
  id: string
  email: string
  emailVerified: Date | null
  avatarUrl: string | null
  roles: Role[]
  nerdbordUserId: string | null
  githubUsername: string | null

  constructor(data: UserWithRelations) {
    this.id = data.id
    this.email = data.email
    this.emailVerified = data.emailVerified
    this.avatarUrl = data.avatarUrl
    this.roles = data.roles
    this.nerdbordUserId = data.nerdbordUserId
    this.githubUsername = data.githubDetails?.username || null
  }

  async assignRole(role: Role) {
    this.roles.push(role)
    const updatedUser = await assignRole(this.id, role)
    return this.sync(updatedUser)
  }

  async unassignRole(role: Role) {
    this.roles = this.roles.filter((r) => r !== role)
    const updatedUser = await unassignRole(this.id, role)
    return this.sync(updatedUser)
  }

  async importURLAvatarFromGithub(): Promise<string | null> {
    if (!this.githubUsername) {
      throw new Error('User does not have a GitHub username')
    }

    return await importAvatarFromGithub()
  }

  async updateAvatar(avatarUrl: string) {
    this.avatarUrl = avatarUrl
    await updateMyAvatar(avatarUrl)
  }

  sync(nextData: UserModel): UserModel {
    return Object.assign(this, nextData)
  }
}
