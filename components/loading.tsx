import Head from 'next/head';
import React from 'react';
import Layout from './layout';


const Loading: React.FC = ({  }) => {
    return (
        <Layout>
            <>
                <Head>
                    <title>Loading...</title>
                </Head>
                <div className='max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 items-center h-full'>
                    <div className='bg-black bg-opacity-30 p-4 rounded-md sm:col-span-full'>
                        <h1 className='text-3xl font-bold mb-2'>Loading...</h1>
                        <p>We are still loading the page, please wait.</p>
                    </div>
                </div>
            </>
        </Layout>
    )
}

export default Loading;
