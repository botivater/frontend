import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from '../components/layout'
import { useFetchUser } from '../lib/user'


const Home: NextPage = () => {
  const router = useRouter();
  const { user, loading } = useFetchUser();

  useEffect(() => {
    if (!loading && user) router.push("/dashboard");
  });

  return (
    <Layout user={user} loading={loading}>
      <>
        <Head>
          {/* <title>Login </title> */}
          {/* <link rel="icon" href="/favicon.ico" /> */}
        </Head>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-2 items-center h-full'>
          {loading &&
            <div className='md:col-start-2 text-center'>
              <h1>Loading...</h1>
            </div>
          }
          {!loading && user &&
            <div className='bg-gray-700 rounded-md shadow-md p-4 md:col-start-2'>
              <div className='pb-2'>
                <h1 className='font-bold text-lg'>Logged in!</h1>
              </div>
              <div>
                <p>You are now being redirected to the dashboard.</p>
              </div>
            </div>
          }
          {!loading && !user &&
            <div className='bg-gray-700 rounded-md shadow-md p-4 md:col-start-2'>
              <div className='pb-2'>
                <h1 className='font-bold text-lg'>Not logged in.</h1>
              </div>
              <div>
                <p>You must be logged in to view the resource you were trying to access.</p>
              </div>
              <div className='pt-2'>
                <Link href={"/api/login"}><a className='bg-blue-500 hover:bg-blue-700 transition-all duration-300 p-2 block text-center rounded-md shadow-md'>Login</a></Link>
              </div>
            </div>
          }

        </div>
      </>
    </Layout>
  )
}

export default Home
