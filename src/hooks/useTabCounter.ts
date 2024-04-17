import { type ProfileModel } from '@/app/(profile)/_models/profile.model'
import { type PublishingState } from '@prisma/client'
import { useEffect } from 'react'

export default function (
  data: ProfileModel[],
  state: PublishingState,
  callback: (value: number) => void,
) {
  useEffect(() => {
    const counter = data.reduce(
      (acc, item) => (item.state === state ? (acc += 1) : acc),
      0,
    )
    callback(counter)
  }, [data])
}
