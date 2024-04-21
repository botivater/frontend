import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Head from 'next/head'
import React from 'react'
import Header from './header'

type Props = {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  const date = new Date()

  return (
    <>
      <Head>
        <title>Botivater Control Panel</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="flex grow bg-gray-800 py-4 text-white">
          <div className="container mx-auto grow">{children}</div>
        </main>

        <footer className="bg-gray-700 py-4 text-center text-white">
          <div className="container mx-auto">
            <div className="mx-auto flex max-w-6xl flex-row justify-between px-4">
              <small>
                &copy; {date.getFullYear()} Jonas Claes. All rights reserved.
              </small>
              <small>
                Made with{' '}
                <FontAwesomeIcon icon={faHeart} className="text-red-600" /> in
                🇧🇪
              </small>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Layout
