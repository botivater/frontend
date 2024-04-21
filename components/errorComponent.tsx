import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Layout from './layout'

type Props = {
  message?: string
}

const ErrorComponent: React.FC<Props> = ({ message }) => {
  return (
    <Layout>
      <>
        <Head>
          <title>Error</title>
        </Head>
        <div className="mx-auto grid h-full max-w-6xl grid-cols-1 items-center gap-4 px-4 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-md bg-black bg-opacity-30 p-4 sm:col-span-full">
            <h1 className="mb-2 text-3xl font-bold">Error!</h1>
            <p>An error occurred while fetching this page.</p>
            {message && (
              <>
                <p className="mt-2">Error message:</p>
                <pre className="rounded-md bg-black bg-opacity-50 p-4">
                  {message}
                </pre>
              </>
            )}
            <p className="mt-2">
              <Link href={'/'}>
                <a className="font-bold text-blue-500">Go back to dashboard</a>
              </Link>
            </p>
          </div>
        </div>
      </>
    </Layout>
  )
}

export default ErrorComponent
