'use client'
import React from 'react'
import { signOut } from 'next-auth/react'

const LogOutBtn = () => {
  return (
    <div><button onClick={()=> signOut}>Log out</button></div>
  )
}

export default LogOutBtn