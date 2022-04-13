import Link from 'next/link';
import React from 'react';


type Props = {
    user: any;
    loading: boolean;
}

const Header: React.FC<Props> = ({ children, user, loading }) => {
    return (
        <header className='bg-gray-700 text-white'>
            <div className='container mx-auto'>
                <div className='flex flex-row justify-between items-center h-16 px-4 max-w-6xl mx-auto'>
                    <h1 className='text-xl'>Discord Bot Admin</h1>
                    <ul className='flex flex-row items-center gap-2 h-full'>
                        {loading &&
                            <li>
                                <span>Loading...</span>
                            </li>
                        }
                        {!loading && user &&
                            <>
                                <li>
                                    <Link href={"/dashboard"}><a>Dashboard</a></Link>
                                </li>
                                <li>
                                    <Link href={"/api/logout"}><a>Logout</a></Link>
                                </li>
                                <li className='h-full py-2'>
                                    <img src={user.picture} className="object-contain h-full rounded-full" />
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
