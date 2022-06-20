import { faBars, faHome, faRightFromBracket, faShuffle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useState } from 'react';
import { useContext } from 'react';
import { useGuild } from '../lib/api/Guild.api';
import { useAppContext } from './context/AppContext';
import AuthContext from './context/AuthContext';
import { NavigationLinkItem } from './navigation/NavigationLinkItem';


const Header: React.FC = () => {
    const { isLoading: isAuthLoading, user } = useContext(AuthContext)!;
    const { guildId } = useAppContext();

    const { error: guildError, data: guild, isLoading: isGuildLoading } = useGuild(guildId);

    const [showNavDropdown, setShowNavDropdown] = useState(false);

    const navigationLinks = [
        {
            text: <span><FontAwesomeIcon icon={faHome} />&nbsp;Dashboard</span>,
            href: "/dashboard"
        },
        {
            text: <span><FontAwesomeIcon icon={faShuffle} />&nbsp;Switch tenant</span>,
            href: "/tenantSwitcher"
        },
        {
            text: <span><FontAwesomeIcon icon={faRightFromBracket} />&nbsp;Logout</span>,
            href: "/logout"
        },
    ]

    return (
        <header className='bg-gray-700 text-white'>
            <div className='container mx-auto'>
                <div className='flex flex-row justify-between items-center h-16 px-4 max-w-6xl mx-auto'>
                    <h1 className='text-xl font-bold'>Botivater Control Panel</h1>
                    <ul className='hidden sm:flex flex-row items-center gap-4 h-full'>
                        {isAuthLoading &&
                            <li>
                                <span>Loading...</span>
                            </li>
                        }
                        {user && navigationLinks.map(navigationLink => <NavigationLinkItem key={navigationLink.href} href={navigationLink.href} >{navigationLink.text}</NavigationLinkItem>)}
                    </ul>
                    <button className='sm:hidden' onClick={() => setShowNavDropdown(!showNavDropdown)}><FontAwesomeIcon icon={faBars} /></button>
                </div>
            </div>

            <div className={classNames({
                'py-4 bg-gray-800 sm:hidden': true,
                'hidden': !showNavDropdown
            })}>
                <ul className={'flex flex-col gap-4 h-full px-4 container mx-auto'}>
                    {isAuthLoading &&
                        <li>
                            <span>Loading...</span>
                        </li>
                    }
                    {user && navigationLinks.map(navigationLink => <NavigationLinkItem key={navigationLink.href} href={navigationLink.href}>{navigationLink.text}</NavigationLinkItem>)}
                </ul>
            </div>

            {user &&
                <div className='bg-blue-800'>
                    <div className='container mx-auto'>
                        <div className='max-w-6xl mx-auto py-2 px-4'>
                            {guild && <p>You are currently working in tenant: <span className='font-bold'>{guild.name}</span></p>}
                            {!guild && <p>No tenant has been selected! Please select a tenant to start working...</p>}
                        </div>
                    </div>
                </div>
            }

        </header>
    )
}

export default Header;
