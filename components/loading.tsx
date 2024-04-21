import Head from 'next/head'
import React from 'react'
import Layout from './layout'

const Loading: React.FC = ({}) => {
  return (
    <Layout>
      <>
        <Head>
          <title>Loading...</title>
        </Head>
        <div className="mx-auto grid h-full max-w-6xl grid-cols-1 items-center gap-4 px-4 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-md bg-black bg-opacity-30 p-4 sm:col-span-full">
            <h1 className="mb-2 text-3xl font-bold">Loading...</h1>
            <p>We are still loading the page, please wait.</p>
          </div>
        </div>
      </>
    </Layout>
  )
}

export default Loading
