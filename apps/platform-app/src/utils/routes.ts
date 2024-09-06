export enum AppRoutes {
  home = '/',
  myProfile = '/my-profile',
  createProfile = '/my-profile/create',
  editProfile = '/my-profile/edit',
  githubOAuth = '/github-oauth',
  moderation = '/moderation',
  moderationProfile = '/moderation/profile',
  profilesList = '/profiles',
  profile = '/p',
  signIn = '/signin',
  error = '/error',
}

export const removeLocaleFromPath = (pathname: string, locale: string) => {
  const localePattern = new RegExp(`^/${locale}(/|$)`)
  return pathname.replace(localePattern, '/')
}