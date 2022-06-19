import classNames from 'classnames';
import React, { useState } from 'react';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import { NavigationLinkItem } from './navigation/NavigationLinkItem';


const Header: React.FC = () => {
    const { isLoading, user } = useContext(AuthContext)!;

    const [showNavDropdown, setShowNavDropdown] = useState(false);

    const navigationLinks = [
        {
            text: "Dashboard",
            href: "/dashboard"
        },
        {
            text: "Switch tenant",
            href: "/tenantSwitcher"
        },
        {
            text: "Logout",
            href: "/logout"
        },
    ]

    return (
        <header className='bg-gray-700 text-white'>
            <div className='container mx-auto'>
                <div className='flex flex-row justify-between items-center h-16 px-4 max-w-6xl mx-auto'>
                    <h1 className='text-xl'>Botivater Control Panel</h1>
                    <ul className='hidden xs:flex flex-row items-center gap-4 h-full'>
                        {isLoading &&
                            <li>
                                <span>Loading...</span>
                            </li>
                        }
                        {user && navigationLinks.map(navigationLink => <NavigationLinkItem key={navigationLink.text} text={navigationLink.text} href={navigationLink.href} />)}
                    </ul>
                    <button className='xs:hidden' onClick={() => setShowNavDropdown(!showNavDropdown)}>Show nav</button>
                </div>
                <ul className={classNames({
                    'flex xs:hidden flex-col items-start gap-4 h-full bg-gray-700 py-6 px-4 border-t-2 border-gray-800': true,
                    'hidden': !showNavDropdown
                })}>
                    {isLoading &&
                        <li>
                            <span>Loading...</span>
                        </li>
                    }
                    {user && navigationLinks.map(navigationLink => <NavigationLinkItem key={navigationLink.text} text={navigationLink.text} href={navigationLink.href} />)}
                </ul>
            </div>
        </header>
    )
}

export default Header;
