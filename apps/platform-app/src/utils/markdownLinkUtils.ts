/**
 * Checks if a given URL is external to the current site.
 * Handles relative paths, anchor links, mailto, and tel protocols as internal.
 * Compares hostnames for absolute HTTP/HTTPS URLs.
 */
export const isExternalLink = (url?: string | null): boolean => {
  if (!url) {
    return false
  }

  // Consider relative paths and anchor links as internal
  if (
    url.startsWith('/') ||
    url.startsWith('./') ||
    url.startsWith('../') ||
    url.startsWith('#')
  ) {
    return false
  }

  // Consider mailto and tel links as non-navigational in this context
  if (url.startsWith('mailto:') || url.startsWith('tel:')) {
    return false
  }

  try {
    const linkUrl = new URL(url)

    // Only proceed with http and https protocols for external site checks
    if (linkUrl.protocol !== 'http:' && linkUrl.protocol !== 'https:') {
      return false
    }

    // This check will run client-side where window.location is available
    if (typeof window !== 'undefined' && window.location?.hostname) {
      return linkUrl.hostname !== window.location.hostname
    } else {
      // Fallback for environments without window.location (e.g., during SSR if used directly, though less likely for this specific hook)
      // If we can't determine the current host, assume an absolute HTTP/S URL is external.
      return true
    }
  } catch (e) {
    // If URL parsing fails, it's likely not a standard web URL we need to warn about.
    return false
  }
}
