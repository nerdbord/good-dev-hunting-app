export interface BaseModel<K> {
  sync(nextData: K): K
}
