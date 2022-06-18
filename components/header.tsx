import React from 'react';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import { NavigationLinkItem } from './navigation/NavigationLinkItem';


const Header: React.FC = () => {
    const { isLoading, user } = useContext(AuthContext)!;

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
                    <ul className='flex flex-row items-center gap-4 h-full'>
                        {isLoading &&
                            <li>
                                <span>Loading...</span>
                            </li>
                        }
                        {user && navigationLinks.map(navigationLink => <NavigationLinkItem key={navigationLink.text} text={navigationLink.text} href={navigationLink.href} />)}
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header;
