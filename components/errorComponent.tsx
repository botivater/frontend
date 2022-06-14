import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Layout from './layout';


type Props = {
    message?: string;
}

const ErrorComponent: React.FC<Props> = ({ message }) => {
    return (
        <Layout>
            <>
                <Head>
                    <title>Error</title>
                </Head>
                <div className='max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 items-center h-full'>
                    <div className='bg-black bg-opacity-30 p-4 rounded-md sm:col-span-full'>
                        <h1 className='text-3xl font-bold mb-2'>Error!</h1>
                        <p>An error occurred while fetching this page.</p>
                        {message &&
                            <>
                                <p className='mt-2'>Error message:</p>
                                <pre className='bg-black bg-opacity-50 rounded-md p-4'>{message}</pre>
                            </>
                        }
                        <p className='mt-2'>
                            <Link href={"/"}>
                                <a className='text-blue-500 font-bold'>Go back to dashboard</a>
                            </Link>
                        </p>
                    </div>
                </div>
            </>
        </Layout>
    )
}

export default ErrorComponent;
