import {
  faBars,
  faHome,
  faRightFromBracket,
  faShuffle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import React, { useState } from 'react'
import { useContext } from 'react'
import { useGuild } from '../lib/api/Guild.api'
import AppContext from './context/AppContext'
import AuthContext from './context/AuthContext'
import { NavigationLinkItem } from './navigation/NavigationLinkItem'

const Header: React.FC = () => {
  const { isLoading: isAuthLoading, user } = useContext(AuthContext)!
  const { guildId } = useContext(AppContext)!

  const {
    error: guildError,
    data: guild,
    isLoading: isGuildLoading,
  } = useGuild(guildId)

  const [showNavDropdown, setShowNavDropdown] = useState(false)

  const navigationLinks = [
    {
      text: (
        <span>
          <FontAwesomeIcon icon={faHome} />
          &nbsp;Dashboard
        </span>
      ),
      href: '/dashboard',
    },
    {
      text: (
        <span>
          <FontAwesomeIcon icon={faShuffle} />
          &nbsp;Switch tenant
        </span>
      ),
      href: '/tenantSwitcher',
    },
    {
      text: (
        <span>
          <FontAwesomeIcon icon={faRightFromBracket} />
          &nbsp;Logout
        </span>
      ),
      href: '/logout',
    },
  ]

  return (
    <header className="bg-gray-700 text-white">
      <div className="container mx-auto">
        <div className="mx-auto flex h-16 max-w-6xl flex-row items-center justify-between px-4">
          <h1 className="text-xl font-bold">Botivater Control Panel</h1>
          <ul className="hidden h-full flex-row items-center gap-4 sm:flex">
            {isAuthLoading && (
              <li>
                <span>Loading...</span>
              </li>
            )}
            {user &&
              navigationLinks.map((navigationLink) => (
                <NavigationLinkItem
                  key={navigationLink.href}
                  href={navigationLink.href}
                >
                  {navigationLink.text}
                </NavigationLinkItem>
              ))}
          </ul>
          <button
            className="sm:hidden"
            onClick={() => setShowNavDropdown(!showNavDropdown)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>

      <div
        className={classNames({
          'bg-gray-800 py-4 sm:hidden': true,
          hidden: !showNavDropdown,
        })}
      >
        <ul className={'container mx-auto flex h-full flex-col gap-4 px-4'}>
          {isAuthLoading && (
            <li>
              <span>Loading...</span>
            </li>
          )}
          {user &&
            navigationLinks.map((navigationLink) => (
              <NavigationLinkItem
                key={navigationLink.href}
                href={navigationLink.href}
              >
                {navigationLink.text}
              </NavigationLinkItem>
            ))}
        </ul>
      </div>

      {user && (
        <div className="bg-blue-800">
          <div className="container mx-auto">
            <div className="mx-auto max-w-6xl py-2 px-4">
              {guild && (
                <p>
                  You are currently working in tenant:{' '}
                  <span className="font-bold">{guild.name}</span>
                </p>
              )}
              {!guild && (
                <p>
                  No tenant has been selected! Please select a tenant to start
                  working...
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
