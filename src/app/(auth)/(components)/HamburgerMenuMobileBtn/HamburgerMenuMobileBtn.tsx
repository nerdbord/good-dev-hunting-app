'use client'
import { Button } from '@/components/Button/Button'
import { useState } from 'react'

const HamburgerMenuMobileBtn = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const handleOpenMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <div>
      <Button onClick={handleOpenMenu} variant="standard">
        {isMenuOpen ? 'X' : 'Menu'}
      </Button>
    </div>
  )
}

export default HamburgerMenuMobileBtn
