export interface UserData {
  id: string
  username: string
  avatarUrl: string
  githubUsername: string
  bio: string
}

export interface NerdbordUser {
  user: UserData | null
}
