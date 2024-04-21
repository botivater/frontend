import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useEffect, useState } from 'react'
import AuthContext from '../components/context/AuthContext'
import Layout from '../components/layout'
import Loading from '../components/loading'

const Home: NextPage = () => {
  const { doLogin, error, user, isLoading } = useContext(AuthContext)!
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLoginSubmit = async (event: FormEvent) => {
    event.preventDefault()

    await doLogin({
      email,
      password,
    })
  }

  useEffect(() => {
    if (!isLoading && user) router.push('/dashboard')
  })

  if (isLoading) {
    return <Loading />
  }

  return (
    <Layout>
      <>
        <Head>
          <title>Login</title>
          {/* <link rel="icon" href="/favicon.ico" /> */}
        </Head>
        <div className="mx-auto grid h-full max-w-6xl grid-cols-1 items-center gap-2 px-4 lg:grid-cols-3">
          {user && (
            <div className="rounded-md bg-gray-700 p-4 shadow-md md:col-start-2">
              <div className="pb-2">
                <h1 className="text-lg font-bold">Logged in!</h1>
              </div>
              <div>
                <p>You are now being redirected to the dashboard.</p>
              </div>
            </div>
          )}
          {!user && (
            <div className="rounded-md bg-gray-700 p-4 shadow-md lg:col-start-2">
              <div className="pb-2">
                <h1 className="text-lg font-bold">Login</h1>
              </div>
              {error && (
                <div className="rounded bg-red-500 p-2">
                  <p className="">Error: {error.message}</p>
                </div>
              )}
              <div className="pt-2">
                <form
                  onSubmit={handleLoginSubmit}
                  className="grid grid-cols-1 gap-3"
                >
                  <div>
                    <label htmlFor="email" className="block font-bold">
                      Email:
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="w-full rounded-md border-none bg-black bg-opacity-30"
                      placeholder="john.doe@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.currentTarget.value)}
                      minLength={1}
                    />
                    <small className="block">
                      Please enter your email address here.
                    </small>
                  </div>
                  <div>
                    <label htmlFor="password" className="block font-bold">
                      Password:
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="w-full rounded-md border-none bg-black bg-opacity-30"
                      value={password}
                      onChange={(e) => setPassword(e.currentTarget.value)}
                      minLength={1}
                    />
                    <small className="block">
                      Please enter your password here.
                    </small>
                  </div>
                  <button
                    className="block cursor-pointer rounded-md bg-blue-500 p-2 text-center shadow-md transition-all duration-300 hover:bg-blue-700"
                    type="submit"
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </>
    </Layout>
  )
}

export default Home
