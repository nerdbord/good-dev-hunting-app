import React from 'react'
import { Container } from '@/components/Container/Container'
import DashboardHeader from '@/components/Headers/DashboardHeader/DashboardHeader'
import { ToastContextProvider } from '@/contexts/ToastContext'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ToastContextProvider>
      {/* @ts-expect-error Server Component */}
      <DashboardHeader />
      <Container>{children}</Container>
    </ToastContextProvider>
  )
}
