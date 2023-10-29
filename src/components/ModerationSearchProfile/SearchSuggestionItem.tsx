import { ProfileModel } from '@/data/frontend/profile/types'

import styles from './SearchSuggestionItem.module.scss'

interface SearchSuggestionsProps {
  searchValue: string
  onClick: (text: string) => void
  user: ProfileModel
}

const highlightText = (text: string, searchText: string) => {
  const parts = text.split(new RegExp(`(${searchText})`, 'gi'))
  return (
    <p className={styles.userEmail}>
      {parts.map((part, index) =>
        part.toLowerCase() === searchText.toLowerCase() ? (
          <span key={index} className={styles.highlighted}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </p>
  )
}

export const SearchSuggestionItem = ({
  searchValue,
  onClick,
  user,
}: SearchSuggestionsProps) => {
  return (
    <li
      className={styles.suggestionItem}
      onClick={() => onClick(user.userEmail)}
    >
      <img
        src={user.avatarUrl ? user.avatarUrl : ''}
        alt="img"
        className={styles.suggestionImg}
      />
      <div>
        <p className={styles.userName}>{user.fullName}</p>
        {highlightText(user.userEmail, searchValue)}
      </div>
    </li>
  )
}
