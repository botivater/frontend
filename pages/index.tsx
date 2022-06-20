import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useEffect, useState } from 'react'
import AuthContext from '../components/context/AuthContext'
import Layout from '../components/layout'
import Loading from '../components/loading'


const Home: NextPage = () => {
  const { doLogin, error, user, isLoading } = useContext(AuthContext)!;
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await doLogin({
      email,
      password
    });
  }

  useEffect(() => {
    if (!isLoading && user) router.push("/dashboard");
  });

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
        <div className='max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-2 items-center h-full'>
          {user &&
            <div className='bg-gray-700 rounded-md shadow-md p-4 md:col-start-2'>
              <div className='pb-2'>
                <h1 className='font-bold text-lg'>Logged in!</h1>
              </div>
              <div>
                <p>You are now being redirected to the dashboard.</p>
              </div>
            </div>
          }
          {!user &&
            <div className='bg-gray-700 rounded-md shadow-md p-4 lg:col-start-2'>
              <div className='pb-2'>
                <h1 className='font-bold text-lg'>Login</h1>
              </div>
              {error &&
                <div className='bg-red-500 p-2 rounded'>
                  <p className=''>Error: {error.message}</p>
                </div>
              }
              <div className='pt-2'>
                <form onSubmit={handleLoginSubmit} className='grid grid-cols-1 gap-3'>
                  <div>
                    <label htmlFor="email" className='block font-bold'>Email:</label>
                    <input type="email" name="email" id="email" className='w-full rounded-md bg-black bg-opacity-30 border-none' placeholder='john.doe@example.com' value={email} onChange={(e) => setEmail(e.currentTarget.value)} minLength={1} />
                    <small className='block'>Please enter your email address here.</small>
                  </div>
                  <div>
                    <label htmlFor="password" className='block font-bold'>Password:</label>
                    <input type="password" name="password" id="password" className='w-full rounded-md bg-black bg-opacity-30 border-none' value={password} onChange={(e) => setPassword(e.currentTarget.value)} minLength={1} />
                    <small className='block'>Please enter your password here.</small>
                  </div>
                  <button className='bg-blue-500 hover:bg-blue-700 transition-all duration-300 p-2 block text-center rounded-md shadow-md cursor-pointer' type='submit'>Login</button>
                </form>
              </div>
            </div>
          }
        </div>
      </>
    </Layout>
  )
}

export default Home
