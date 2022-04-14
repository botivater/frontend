import { useAuth0 } from '@auth0/auth0-react';
import Link from 'next/link';
import Image from 'next/image'
import React from 'react';


type Props = {
}

const Header: React.FC<Props> = ({ children }) => {
    const { isAuthenticated, isLoading, user, loginWithRedirect, logout } = useAuth0();

    return (
        <header className='bg-gray-700 text-white'>
            <div className='container mx-auto'>
                <div className='flex flex-row justify-between items-center h-16 px-4 max-w-6xl mx-auto'>
                    <h1 className='text-xl'>Discord Bot Admin</h1>
                    <ul className='flex flex-row items-center gap-2 h-full'>
                        {isLoading &&
                            <li>
                                <span>Loading...</span>
                            </li>
                        }
                        {isAuthenticated && user &&
                            <>
                                <li>
                                    <Link href={"/dashboard"}><a>Dashboard</a></Link>
                                </li>
                                <li>
                                    <a onClick={() => logout({ returnTo: window.location.origin })} className='cursor-pointer'>Logout</a>
                                </li>
                                <li className='h-full py-2'>
                                    { /* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={user.picture} alt={"Profile picture"} className="object-contain h-full rounded-full" />
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header;
