import styles from './search.module.scss'
import { Button } from '../Button/Button'

export default function SearchWrapper() {
  return (
    <div className={styles.searchWrapper}>
      <input
        name="searchValue"
        className={styles.searchInput}
        placeholder="eg. richard@gmail.com"
      />
      <Button variant={'action'}>Search</Button>
    </div>
  )
}
