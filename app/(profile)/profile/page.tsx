import { UserPayload } from '@/backend/user/user.types'
import getRoutePayload from '@/lib/GetRoutePayload'
import React from 'react'

const apiProfilesUrl = 'http://localhost:3000/api/user'

const Profile = async () => {
  const data = await getRoutePayload(`${apiProfilesUrl}`)
  const users = data.data
  console.log('Data', data)
  console.log('Users', users)

  return (
    <>
      <div>
        {users.map((user: UserPayload) => (
          <p>{user.id}</p>
        ))}
        <p>{data.message}</p>
      </div>
    </>
  )
}

export default Profile
