'use client'
import React from 'react'
import styles from './page.module.scss'
import { Container } from '@/components/Container/Container'
import Hero from '@/components/landing-page/Hero/Hero'
import HowItWorks from '@/components/landing-page/HowItWorks/HowItWorks'
import AppHeader from '@/components/Headers/AppHeader/AppHeader'

const Page: React.FC = () => {
  return (
    <Container>
      {/*    <Hero /> */}
      <HowItWorks />
    </Container>
  )
}
export default Page
