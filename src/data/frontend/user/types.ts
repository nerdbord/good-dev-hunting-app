export interface UserModel {
  id: string
  profileId: string
  githubDetails: {
    username: string | null
  }
}
