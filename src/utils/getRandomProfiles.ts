export function getRandomIndexes(size: number, count: number): number[] {
  const indexes = new Set<number>()
  while (indexes.size < count) {
    const randomIndex = Math.floor(Math.random() * size)
    indexes.add(randomIndex)
  }
  return Array.from(indexes)
}
