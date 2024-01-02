'use client'
import { connectToNerdbord } from '@/actions/user/connectToNerdobord'
import { Button } from '../Button/Button'
import RotateIcon from '@/assets/icons/RotateIcon'
import { useState } from 'react'

export const ConnectToNerdbordButton = () => {
  const [NBSynching, setNBSynching] = useState(false)
  const [NBSynchingError, setNBSynchingError] = useState(false)

  const handleConnectToNerdbord = async () => {
    setNBSynching(true)
    setNBSynchingError(false)
    console.log('start connecting', NBSynching)
    try {
      await connectToNerdbord()
    } catch (error) {
      setNBSynchingError(true)
      console.log(error)
    } finally {
      setNBSynching(false)
      console.log('end connecting', NBSynching)
    }
  }

  return (
    <Button variant="secondary" onClick={handleConnectToNerdbord}>
      {NBSynching ? (
        <>
          <RotateIcon /> Synching
        </>
      ) : (
        'Connect with Nerdbord'
      )}
    </Button>
  )
}
