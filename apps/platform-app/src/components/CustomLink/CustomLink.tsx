'use client'

import { useModal } from '@/contexts/ModalContext'
import React, { useCallback } from 'react'
import { isExternalLink } from '../../utils/markdownLinkUtils'
import { LeaveSiteWarningModal } from '../LeaveSiteWarningModal/LeaveSiteWarningModal'

interface CustomLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string
  children?: React.ReactNode
}

export const CustomLink: React.FC<CustomLinkProps> = ({
  href,
  children,
  ...props
}) => {
  const { showModal, closeModal } = useModal()
  const isExt = href ? isExternalLink(href) : false

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (isExt) {
        event.preventDefault()
        showModal(
          <LeaveSiteWarningModal
            onClose={closeModal}
            onConfirm={handleConfirmNavigation}
            destinationUrl={href}
          />,
        )
      }
      if (props.onClick) {
        props.onClick(event)
      }
    },
    [isExt, props.onClick],
  )

  const handleConfirmNavigation = useCallback(() => {
    if (href) {
      window.open(href, '_blank', 'noopener,noreferrer')
    }
    closeModal()
  }, [href])

  const linkProps: React.AnchorHTMLAttributes<HTMLAnchorElement> = {
    ...props,
    href: href || '#',
    onClick: handleClick,
  }

  if (isExt) {
    linkProps.target = '_blank'
    linkProps.rel = 'noopener noreferrer'
  }

  return (
    <>
      <a {...linkProps}>{children}</a>
    </>
  )
}
