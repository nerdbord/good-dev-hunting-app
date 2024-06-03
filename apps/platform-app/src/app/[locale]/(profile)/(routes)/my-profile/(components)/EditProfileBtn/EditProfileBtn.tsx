'use client'
import { Button } from '@gdh/ui-system'
import { AppRoutes } from '@/utils/routes'
import { useRouter } from 'next/navigation'

const EditProfileBtn = () => {
  const router = useRouter()

  const handleEditClick = () => {
    router.push(AppRoutes.editProfile)
  }

  return (
    <Button variant={'secondary'} onClick={handleEditClick}>
      {' '}
      Edit{' '}
    </Button>
  )
}

export default EditProfileBtn
