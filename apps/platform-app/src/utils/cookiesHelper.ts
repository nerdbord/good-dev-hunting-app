export function setCookie(name: string, value: string, days: number) {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
}

export function getCookie(name: string): string | null {
  const matches = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
  return matches ? decodeURIComponent(matches[2]) : null
}
