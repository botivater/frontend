import { faTrash, faPlus, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormikHelpers, Formik, Form, Field, FieldArray } from 'formik'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import AppContext from '../../components/context/AppContext'
import AuthContext from '../../components/context/AuthContext'
import ErrorComponent from '../../components/errorComponent'
import { ErrorMessage } from '../../components/form/ErrorMessage'
import Layout from '../../components/layout'
import Loading from '../../components/loading'
import { LoadingOverlay } from '../../components/LoadingOverlay'
import { useToken } from '../../hooks/use-token'
import {
  deleteCommandAlias,
  updateCommandAlias,
  useCommandAlias,
} from '../../lib/api/CommandAlias.api'
import {
  CommandAliasValidationSchema,
  options,
} from '../../lib/api/validation/CommandAlias.validationSchema'
import { CommandListValidationSchema } from '../../lib/api/validation/CommandList.validationSchema'

interface Values {
  guildId: number
  commandName: string
  internalName: string
}

const CommandAliasPage: NextPage = () => {
  const { isLoading, user } = useContext(AuthContext)!
  const { guildId } = useContext(AppContext)!
  const token = useToken()
  const router = useRouter()
  const { id } = router.query

  const {
    error: commandAliasError,
    data: commandAlias,
    isLoading: isCommandAliasLoading,
  } = useCommandAlias(parseInt(id as string))

  if (typeof id !== 'string') {
    return <span>Invalid parameter: id</span>
  }

  const handleSubmit = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    try {
      await updateCommandAlias(token, parseInt(id), values)
      await router.push('/commandAlias')
    } catch (err) {
      console.error(err)
      alert(err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    const id = commandAlias?.id
    if (!id) throw new Error('Command alias ID not set.')

    if (confirm('Are you sure you want to delete?')) {
      try {
        await deleteCommandAlias(token, id)
        await router.push('/commandAlias')
      } catch (err) {
        console.error(err)
        alert(err)
      }
    }
  }

  if (commandAliasError) {
    console.error(commandAliasError)
    return <ErrorComponent message={commandAliasError.toString()} />
  }

  if (isCommandAliasLoading) {
    return <LoadingOverlay />
  }

  if (!commandAlias) {
    return <ErrorComponent message={'Command alias not defined.'} />
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <Layout>
      <>
        <Head>
          <title>Editing command alias</title>
        </Head>
        {user && (
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4">
            <div>
              <h1 className="text-3xl font-bold">Command aliases</h1>
              <p className="text-white text-opacity-30">
                Connect names to your commands.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Edit command alias</h2>
            </div>
            <Formik
              initialValues={{
                guildId,
                commandName: commandAlias.commandName,
                internalName: commandAlias.internalName,
              }}
              validationSchema={CommandAliasValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="commandName" className="formLabel">
                      Command name:
                    </label>
                    <div className="flex items-stretch justify-center rounded-md bg-black bg-opacity-30">
                      <div className="flex items-center justify-center rounded-l-md bg-black bg-opacity-60">
                        <span className="px-4">/</span>
                      </div>
                      <Field
                        type="text"
                        id="commandName"
                        name="commandName"
                        placeholder="selfcare"
                        className="w-full rounded-r-md border-none bg-transparent"
                      />
                    </div>
                    <small className="formSmall">
                      Enter the command name without the /.
                    </small>
                    <ErrorMessage name="commandName" />
                  </div>

                  <div>
                    <label htmlFor="internalName" className="formLabel">
                      Connected command:
                    </label>
                    <div className="flex items-stretch justify-center rounded-md bg-black bg-opacity-30">
                      <div className="flex items-center justify-center rounded-l-md bg-black bg-opacity-60">
                        <span className="px-4">/</span>
                      </div>
                      <Field
                        as="select"
                        id="internalName"
                        name="internalName"
                        className="w-full rounded-r-md border-none bg-transparent"
                      >
                        <option value="" className="formSelectOption">
                          Select a command...
                        </option>
                        {options.map((option) => (
                          <option
                            key={option}
                            value={option}
                            className="formSelectOption"
                          >
                            {option}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <small className="formSmall">
                      Choose the connected command.
                    </small>
                    <ErrorMessage name="internalName" />
                  </div>

                  <div className="formGroup col-span-full grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <button
                      type="button"
                      className="formButton bg-red-600 hover:bg-red-700"
                      onClick={() => handleDelete()}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                      &nbsp;Delete
                    </button>
                    <button type="submit" disabled={isSubmitting}>
                      <FontAwesomeIcon icon={faSave} />
                      &nbsp;Save
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

export default CommandAliasPage
