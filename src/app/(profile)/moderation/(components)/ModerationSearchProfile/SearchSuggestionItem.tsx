import { type ProfileModel } from '@/app/(profile)/types'
import Image from 'next/image'

import styles from './SearchSuggestionItem.module.scss'

interface SearchSuggestionsProps {
  searchValue: string
  onClick: (text: string) => void
  profile: ProfileModel
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
  profile,
}: SearchSuggestionsProps) => {
  return (
    <li
      className={styles.suggestionItem}
      onClick={() => onClick(profile.userEmail)}
    >
      {profile.avatarUrl && (
        <Image
          src={profile.avatarUrl}
          alt="Profile Picture"
          className={styles.suggestionImg}
          width={36}
          height={36}
        />
      )}
      <div>
        <p className={styles.userName}>{profile.fullName}</p>
        {highlightText(profile.userEmail, searchValue)}
      </div>
    </li>
  )
}
