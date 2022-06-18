import Head from 'next/head';
import React from 'react';
import Header from './header';


type Props = {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
    const date = new Date();

    return (
        <>
            <Head>
                <title>Botivater Control Panel</title>
            </Head>

            <div className='min-h-screen flex flex-col'>
                <Header />

                <main className='bg-gray-800 text-white py-4 grow flex'>
                    <div className='container mx-auto grow'>{children}</div>
                </main>

                <footer className='bg-gray-700 text-white text-center py-4'>
                    <div className='container mx-auto'>
                        <div className='flex flex-row justify-between max-w-6xl mx-auto px-4'>
                            <small>&copy; {date.getFullYear()} Jonas Claes. All rights reserved.</small>
                            <small>Made with ❤ in 🇧🇪</small>
                        </div>
                    </div>

                </footer>
            </div>
        </>
    )
}

export default Layout;
