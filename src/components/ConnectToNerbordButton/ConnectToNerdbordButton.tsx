'use client'
import { connectToNerdbord } from '@/actions/user/connectToNerdobord'
import { Button } from '../Button/Button'
import RotateIcon from '@/assets/icons/RotateIcon'
import { ToastStatus, useToast } from '@/contexts/ToastContext'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export const ConnectToNerdbordButton = () => {
  const { addToast } = useToast()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleConnectToNerdbord = async () => {
    setLoading(true)
    try {
      await connectToNerdbord()
      router.refresh()
    } catch (error) {
      console.error(error)
      addToast(
        'User not found. Make sure your Github account is used on Nerdbord',
        ToastStatus.INVALID,
      )
    } finally {
      setLoading(false)
    }
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
