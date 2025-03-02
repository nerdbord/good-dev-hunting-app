export enum AppRoutes {
  home = '/',
  myProfile = '/my-profile',
  createProfile = '/my-profile/create',
  editProfile = '/my-profile/edit',
  oAuth = '/oauth',
  moderation = '/moderation',
  moderationProfile = '/moderation/profile',
  profilesList = '/profiles',
  profile = '/p',
  signIn = '/signin',
  error = '/error',
  postJob = '/jobs/add',
  jobs = '/jobs',
  job = '/jobs/:id',
  jobEdit = '/jobs/:id/edit',
  myJobs = '/jobs/my-jobs',
  application = '/applications/:id',
}

export const removeLocaleFromPath = (pathname: string, locale: string) => {
  const localePattern = new RegExp(`^/${locale}(/|$)`)
  return pathname.replace(localePattern, '/')
}

export const ensureProtocol = (url: string) => {
  // Check if the URL starts with "http://" or "https://"
  if (/^(https?:\/\/)/i.test(url)) {
    return url // Return the URL as it is if it has a protocol
  }
  return `https://${url}` // Prepend https:// if no protocol is present
}

export const getJobRoute = (id: string) => AppRoutes.job.replace(':id', id)
export const getApplicationRoute = (id: string) =>
  AppRoutes.application.replace(':id', id)
