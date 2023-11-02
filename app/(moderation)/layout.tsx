import React from 'react'
import { Container } from '@/components/Container/Container'
import DashboardHeader from '@/components/Headers/DashboardHeader/DashboardHeader'
import { ToastContextProvider } from '@/contexts/ToastContext'
import { ModalProvider } from '@/contexts/ModalContext'
import RejectingReason from '@/components/RejectingReason/RejectingReason'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <RejectingReason />
      {/* @ts-expect-error Server Component */}
      <DashboardHeader />
      <Container>{children}</Container>
    </>
  )
}
