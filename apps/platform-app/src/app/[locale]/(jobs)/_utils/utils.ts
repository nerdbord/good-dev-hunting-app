export const calculateDaysAgo = (createdDate: string) => {
  const created = new Date(createdDate)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - created.getTime())
  return Math.floor(diffTime / (1000 * 60 * 60 * 24))
}
