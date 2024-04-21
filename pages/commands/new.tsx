import { faPlus, faSave, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Field, FieldArray, Form, Formik, FormikHelpers } from 'formik'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import AppContext from '../../components/context/AppContext'
import AuthContext from '../../components/context/AuthContext'
import { ErrorMessage } from '../../components/form/ErrorMessage'
import Layout from '../../components/layout'
import Loading from '../../components/loading'
import { useToken } from '../../hooks/use-token'
import { createCommandList } from '../../lib/api/CommandList.api'
import { CommandListValidationSchema } from '../../lib/api/validation/CommandList.validationSchema'

interface Values {
  guildId: number
  name: string
  description: string
  options: string[]
}

const CommandListPage: NextPage = () => {
  const { isLoading, user } = useContext(AuthContext)!
  const { guildId } = useContext(AppContext)!
  const token = useToken()
  const router = useRouter()

  const handleSubmit = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    try {
      await createCommandList(token, values)
      await router.push('/commands')
    } catch (err) {
      console.error(err)
      alert(err)
    } finally {
      setSubmitting(false)
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <Layout>
      <>
        <Head>
          <title>New command list</title>
        </Head>
        {user && (
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4">
            <div>
              <h1 className="text-3xl font-bold">Command lists</h1>
              <p className="text-white text-opacity-30">
                Commands that randomly pick an item from a list.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Create command list</h2>
            </div>
            <Formik
              initialValues={{
                guildId,
                name: '',
                description: '',
                options: [''],
              }}
              validationSchema={CommandListValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, values }) => (
                <Form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="formLabel">
                      Name:
                    </label>
                    <div className="flex items-stretch justify-center rounded-md bg-black bg-opacity-30">
                      <div className="flex items-center justify-center rounded-l-md bg-black bg-opacity-60">
                        <span className="px-4">/</span>
                      </div>
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        placeholder="selfcare"
                        className="w-full rounded-r-md border-none bg-transparent"
                      />
                    </div>
                    <small className="formSmall">
                      Enter the command name without the /.
                    </small>
                    <ErrorMessage name="name" />
                  </div>

                  <div className="formGroup">
                    <label htmlFor="description">Description:</label>
                    <Field
                      id="description"
                      name="description"
                      placeholder="Laat de bot een self care tip geven!"
                    />
                    <small>Enter a short description for the command.</small>
                    <ErrorMessage name="description" />
                  </div>

                  <div className="col-span-full ">
                    <FieldArray
                      name="options"
                      render={(arrayHelpers) => (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
                          {values.options && values.options.length > 0 ? (
                            values.options.map((option, index) => (
                              <div key={index}>
                                <label
                                  htmlFor={`options.${index}`}
                                  className="formLabel"
                                >
                                  Option {index + 1}:
                                </label>
                                <div className="flex items-stretch justify-center rounded-md bg-black bg-opacity-30">
                                  <Field
                                    type="text"
                                    name={`options.${index}`}
                                    id={`options.${index}`}
                                    placeholder=""
                                    className="w-full rounded-l-md border-none bg-transparent"
                                  />
                                  <div className="flex items-center justify-center overflow-clip rounded-r">
                                    <button
                                      className="h-full bg-red-600 px-4"
                                      type="button"
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                    <button
                                      className="h-full bg-blue-600 px-4"
                                      type="button"
                                      onClick={() =>
                                        arrayHelpers.insert(index + 1, '')
                                      }
                                    >
                                      <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                  </div>
                                </div>
                                <small className="block">Enter a text.</small>
                                <ErrorMessage name={`options.${index}`} />
                              </div>
                            ))
                          ) : (
                            <div>
                              <button
                                type="button"
                                onClick={() => arrayHelpers.push('')}
                                className="formButton bg-blue-600 hover:bg-blue-700"
                              >
                                <FontAwesomeIcon icon={faPlus} />
                                &nbsp;Add option
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    />
                    <ErrorMessage name="options" />
                  </div>

                  <div className="formGroup">
                    <button type="submit" disabled={isSubmitting}>
                      <FontAwesomeIcon icon={faSave} />
                      &nbsp;Create
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </>
    </Layout>
  )
}

export default CommandListPage
