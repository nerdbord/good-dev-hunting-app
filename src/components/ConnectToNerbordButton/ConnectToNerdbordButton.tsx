'use client'
import { connectToNerdbord } from '@/actions/user/connectToNerdbord'
import { Button } from '../Button/Button'
import RotateIcon from '@/assets/icons/RotateIcon'
import { useAsyncAction } from '@/hooks/useAsyncAction'

export const ConnectToNerdbordButton = () => {
  const { runAsync, loading } = useAsyncAction()

  const handleConnectToNerdbord = () => {
    runAsync(async () => {
      await connectToNerdbord()
    })
  }

  return (
    <Button variant="secondary" onClick={handleConnectToNerdbord}>
      {loading ? (
        <>
          <RotateIcon /> Synching
        </>
      ) : (
        'Connect with Nerdbord'
      )}
    </Button>
  )
}
