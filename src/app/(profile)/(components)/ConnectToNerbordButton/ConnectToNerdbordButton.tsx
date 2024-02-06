'use client'
import { connectToNerdbord } from '@/app/(auth)/_actions/connectToNerdbord'
import RotateIcon from '@/assets/icons/RotateIcon'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { Button } from '../../../../components/Button/Button'

export const ConnectToNerdbordButton = () => {
  const { runAsync, loading } = useAsyncAction()

  const handleConnectToNerdbord = () => {
    runAsync(async () => {
      await connectToNerdbord()
    })
  }

  return (
    <Button
      variant="secondary"
      disabled={loading}
      onClick={handleConnectToNerdbord}
    >
      {loading ? (
        <>
          <RotateIcon /> Syncing
        </>
      ) : (
        'Connect to Nerdbord'
      )}
    </Button>
  )
}
