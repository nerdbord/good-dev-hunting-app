import { type Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Inbox | Good Dev Hunting',
  description: 'Manage your job negotiations and messages',
}

export default function InboxLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
