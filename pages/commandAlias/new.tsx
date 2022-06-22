import { faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormikHelpers, Formik, Form, Field } from 'formik'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import AppContext from '../../components/context/AppContext'
import AuthContext from '../../components/context/AuthContext'
import { ErrorMessage } from '../../components/form/ErrorMessage'
import Layout from '../../components/layout'
import Loading from '../../components/loading'
import { useToken } from '../../hooks/use-token'
import { createCommandAlias } from '../../lib/api/CommandAlias.api'
import { CommandAliasValidationSchema, options } from '../../lib/api/validation/CommandAlias.validationSchema'

interface Values {
  guildId: number;
  commandName: string;
  internalName: string;
}


const NewCommandAliasPage: NextPage = () => {
  const { isLoading, user } = useContext(AuthContext)!;
  const { guildId } = useContext(AppContext)!;
  const token = useToken();
  const router = useRouter();


  const handleSubmit = async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
    try {
      await createCommandAlias(token, values);
      await router.push('/commandAlias');
    } catch (err) {
      console.error(err);
      alert(err);
    } finally {
      setSubmitting(false);
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <Layout>
      <>
        <Head>
          <title>Creating command alias</title>
        </Head>
        {user &&
          <div className='max-w-6xl mx-auto px-4 flex flex-col gap-4'>
            <div>
              <h1 className='text-3xl font-bold'>Command aliases</h1>
              <p className='text-white text-opacity-30'>Connect names to your commands.</p>
            </div>
            <div>
              <h2 className='text-2xl font-bold'>Create command alias</h2>
            </div>
            <Formik
              initialValues={{
                guildId,
                commandName: "",
                internalName: "",
              }}
              validationSchema={CommandAliasValidationSchema}
              onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <Form className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div>
                    <label htmlFor="commandName" className='formLabel'>Command name:</label>
                    <div className='flex items-stretch justify-center bg-black bg-opacity-30 rounded-md'>
                      <div className='bg-black bg-opacity-60 flex items-center justify-center rounded-l-md'>
                        <span className='px-4'>/</span>
                      </div>
                      <Field type="text" id="commandName" name="commandName" placeholder="selfcare" className='w-full rounded-r-md bg-transparent border-none' />
                    </div>
                    <small className='formSmall'>Enter the command name without the /.</small>
                    <ErrorMessage name='commandName' />
                  </div>

                  <div>
                    <label htmlFor="internalName" className='formLabel'>Connected command:</label>
                    <div className='flex items-stretch justify-center bg-black bg-opacity-30 rounded-md'>
                      <div className='bg-black bg-opacity-60 flex items-center justify-center rounded-l-md'>
                        <span className='px-4'>/</span>
                      </div>
                      <Field as="select" id="internalName" name="internalName" className='w-full rounded-r-md bg-transparent border-none'>
                        <option value="" className='formSelectOption'>Select a command...</option>
                        {options.map(option => (
                          <option key={option} value={option} className='formSelectOption'>{option}</option>
                        ))}
                      </Field>
                    </div>
                    <small className='formSmall'>Choose the connected command.</small>
                    <ErrorMessage name='internalName' />
                  </div>

                  <div className='formGroup col-span-full grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <button type='submit' disabled={isSubmitting}><FontAwesomeIcon icon={faSave} />&nbsp;Save</button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        }
      </>
    </Layout>
  )
}

export default NewCommandAliasPage;
