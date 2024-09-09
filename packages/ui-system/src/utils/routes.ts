export enum AppRoutes {
  home = "/",
  myProfile = "/my-profile",
  createProfile = "/my-profile/create",
  editProfile = "/my-profile/edit",
  githubOAuth = "/github-oauth",
  moderation = "/moderation",
  moderationProfile = "/moderation/profile",
  profilesList = "/profiles",
  profile = "/p",
  signIn = "/signin",
  error = "/error",
}

export const ensureProtocol = (url: string) => {
  // Check if the URL starts with "http://" or "https://"
  if (/^(https?:\/\/)/i.test(url)) {
    return url; // Return the URL as it is if it has a protocol
  }
  return `https://${url}`; // Prepend https:// if no protocol is present
};