'use client'
import { connectToNerdbord } from '@/app/[locale]/(auth)/_actions/mutations/connectToNerdbord'
import RotateIcon from '@/assets/icons/RotateIcon'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { Button } from '@gdh/ui-system'

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
        'Connect with Nerdbord'
      )}
    </Button>
  )
}
