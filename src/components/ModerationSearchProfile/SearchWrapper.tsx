'use client'
import { ChangeEvent, useState } from 'react'
import { Button } from '../Button/Button'
import { SearchSuggestionItem } from './SearchSuggestionItem'
import { ProfileModel } from '@/data/frontend/profile/types'
import { useModerationFilter } from '@/contexts/ModerationFilterContext'

import styles from './SearchWrapper.module.scss'

type Props = {
  data: ProfileModel[]
}

export default function SearchWrapper({ data = [] }: Props) {
  const [searchValue, setSearchValue] = useState('')
  const { setEmailSearchValue, setActiveTab } = useModerationFilter()

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const searchHandler = () => {
    if (searchValue === '') return
    setEmailSearchValue && setEmailSearchValue(searchValue)
    setActiveTab && setActiveTab(null)
    setSearchValue('')
  }

  const filteredUsers = data.filter((user) => {
    return searchValue !== '' && user.userEmail.includes(searchValue)
  })

  return (
    <div className={styles.searchWrapper}>
      <input
        name="searchValue"
        className={styles.searchInput}
        placeholder="eg. richard@gmail.com"
        onChange={changeHandler}
        value={searchValue}
      />
      <Button variant={'action'} onClick={searchHandler}>
        Search
      </Button>
      {filteredUsers.length > 0 && (
        <ul className={styles.suggestionsBox}>
          {filteredUsers.map((user) => (
            <SearchSuggestionItem
              key={user.id}
              searchValue={searchValue}
              onClick={setSearchValue}
              user={user}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
