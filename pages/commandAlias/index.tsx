import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../components/context/AppContext'
import AuthContext from '../../components/context/AuthContext'
import ErrorComponent from '../../components/errorComponent'
import Layout from '../../components/layout'
import Loading from '../../components/loading'
import { useToken } from '../../hooks/use-token'
import { useAllCommandAliases } from '../../lib/api/CommandAlias.api'
import { loadGuildCommands } from '../../lib/api/DiscordBot'

const CommandAliasesPage: NextPage = () => {
  const { isLoading, user } = useContext(AuthContext)!
  const { guildId } = useContext(AppContext)!
  const token = useToken()
  const router = useRouter()

  const [isReloading, setReloading] = useState(false)

  const reloadCommands = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setReloading(true)

    try {
      const result = await loadGuildCommands(token, guildId)

      setReloading(false)

      if (result) alert('Discord Bot reload complete!')
      else alert('An error occurred while reloading the Discord Bot.')
    } catch (err) {
      setReloading(false)
      console.error(err)
      alert(err)
    }
  }

  const {
    error: allCommandAliasesError,
    data: allCommandAliases,
    isLoading: isAllCommandAliasesLoading,
  } = useAllCommandAliases(guildId)

  if (allCommandAliasesError) {
    console.error(allCommandAliasesError)
    return <ErrorComponent message={allCommandAliasesError.toString()} />
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <Layout>
      <>
        <Head>
          <title>Command aliases</title>
        </Head>
        {user && (
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4">
            <div>
              <h1 className="text-3xl font-bold">Command aliases</h1>
              <p className="text-white text-opacity-30">
                Connect names to your commands.
              </p>
            </div>
            <h2 className="text-2xl font-bold">General</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <div>
                <button
                  className="w-full rounded-md bg-blue-600 py-2 px-4 shadow-md transition-all duration-300 hover:bg-blue-700 disabled:animate-pulse disabled:bg-gray-600"
                  disabled={isReloading}
                  onClick={(e) => reloadCommands(e)}
                >
                  Push changes to Discord
                </button>
                <small className="block text-white text-opacity-30">
                  Press this button when you have made changes to the commands.
                </small>
              </div>
              <div>
                <Link href={'/commandAlias/new'}>
                  <a className="block w-full rounded-md bg-green-600 py-2 px-4 text-center shadow-md transition-all duration-300 hover:bg-green-700">
                    Create a new command alias
                  </a>
                </Link>
                <small className="block text-white text-opacity-30">
                  Press this button to create a new command alias.
                </small>
              </div>
            </div>
            <h2 className="text-2xl font-bold">Command aliases</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {!isAllCommandAliasesLoading &&
                allCommandAliases &&
                allCommandAliases.map((commandList) => (
                  <Link
                    href={`/commandAlias/${commandList.id}`}
                    key={commandList.id}
                  >
                    <a
                      className={
                        'flex transform cursor-pointer flex-col items-start justify-start rounded-md bg-gray-700 p-4 text-lg shadow-md transition-all duration-300 hover:scale-105'
                      }
                    >
                      <h1 className="font-bold">/{commandList.commandName}</h1>
                      <small className="text-white text-opacity-30">
                        is coupled to /{commandList.internalName}
                      </small>
                    </a>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </>
    </Layout>
  )
}

export default CommandAliasesPage
