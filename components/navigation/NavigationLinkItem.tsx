import Link from 'next/link'
import React from 'react'

export const NavigationLinkItem: React.FC<{
  children: React.ReactNode
  href: string
}> = ({ children, href }) => {
  return (
    <li>
      <Link href={href}>
        <a>{children}</a>
      </Link>
    </li>
  )
}
