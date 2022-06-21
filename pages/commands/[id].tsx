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
import { deleteCommandList, updateCommandList, useCommandList } from '../../lib/api/CommandList.api'
import { CommandListValidationSchema } from '../../lib/api/validation/CommandList.validationSchema'

interface Values {
  guildId: number;
  name: string;
  description: string;
  options: string[];
}


const IndividualCommandListPage: NextPage = () => {
  const { isLoading, user } = useContext(AuthContext)!;
  const { guildId } = useContext(AppContext)!;
  const token = useToken();
  const router = useRouter();
  const { id } = router.query;

  const { error: commandListError, data: commandList, isLoading: isCommandListLoading } = useCommandList(parseInt(id as string));

  if (typeof(id) !== "string") {
    return <span>Invalid parameter: id</span>;
  }

  const handleSubmit = async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
    try {
      await updateCommandList(token, parseInt(id), values);
      await router.push('/commands');
    } catch (err) {
      console.error(err);
      alert(err);
    } finally {
      setSubmitting(false);
    }
  }

  const handleDelete = async () => {
    const id = commandList?.id;
    if (!id) throw new Error("Command list ID not set.");

    if (confirm("Are you sure you want to delete?")) {
      try {
        await deleteCommandList(token, id);
        await router.push("/commands");
      } catch (err) {
        console.error(err);
        alert(err);
      }
    }
  }

  if (commandListError) {
    console.error(commandListError);
    return <ErrorComponent message={commandListError.toString()} />
  }

  if (isCommandListLoading) {
    return <LoadingOverlay />;
  }

  if (!commandList) {
    return <ErrorComponent message={"Command list not defined."} />
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <Layout>
      <>
        <Head>
          <title>Editing command list</title>
        </Head>
        {user &&
          <div className='max-w-6xl mx-auto px-4 flex flex-col gap-4'>
            <div>
              <h1 className='text-3xl font-bold'>Command lists</h1>
              <p className='text-white text-opacity-30'>Commands that randomly pick an item from a list.</p>
            </div>
            <div>
              <h2 className='text-2xl font-bold'>Edit command list</h2>
            </div>
            <Formik
              initialValues={{
                guildId,
                name: commandList.name,
                description: commandList.description,
                options: commandList.options
              }}
              validationSchema={CommandListValidationSchema}
              onSubmit={handleSubmit}>
              {({ isSubmitting, values }) => (
                <Form className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div>
                    <label htmlFor="name" className='formLabel'>Name:</label>
                    <div className='flex items-stretch justify-center bg-black bg-opacity-30 rounded-md'>
                      <div className='bg-black bg-opacity-60 flex items-center justify-center rounded-l-md'>
                        <span className='px-4'>/</span>
                      </div>
                      <Field type="text" id="name" name="name" placeholder="selfcare" className='w-full rounded-r-md bg-transparent border-none' />
                    </div>
                    <small className='formSmall'>Enter the command name without the /.</small>
                    <ErrorMessage name='name' />
                  </div>

                  <div className='formGroup'>
                    <label htmlFor="description">Description:</label>
                    <Field id="description" name="description" placeholder="Laat de bot een self care tip geven!" />
                    <small>Enter a short description for the command.</small>
                    <ErrorMessage name='description' />
                  </div>

                  <div className='col-span-full '>
                    <FieldArray
                      name='options'
                      render={arrayHelpers => (
                        <div className='grid grid-cols-1 sm:grid-cols-1 gap-4'>
                          {values.options && values.options.length > 0 ? (
                            values.options.map((option, index) => (
                              <div key={index}>
                                <label htmlFor={`options.${index}`} className='formLabel'>Option {index + 1}:</label>
                                <div className='flex items-stretch justify-center bg-black bg-opacity-30 rounded-md'>
                                  <Field type="text" name={`options.${index}`} id={`options.${index}`} placeholder='' className='w-full rounded-l-md bg-transparent border-none' />
                                  <div className='flex items-center justify-center rounded-r overflow-clip'>
                                    <button className='bg-red-600 px-4 h-full' type='button' onClick={() => arrayHelpers.remove(index)}><FontAwesomeIcon icon={faTrash} /></button>
                                    <button className='bg-blue-600 px-4 h-full' type='button' onClick={() => arrayHelpers.insert(index + 1, '')}><FontAwesomeIcon icon={faPlus} /></button>
                                  </div>
                                </div>
                                <small className='block'>Enter a text.</small>
                                <ErrorMessage name={`options.${index}`} />
                              </div>
                            ))
                          ) : (
                            <div>
                              <button type='button' onClick={() => arrayHelpers.push('')} className='formButton bg-blue-600 hover:bg-blue-700'><FontAwesomeIcon icon={faPlus} />&nbsp;Add option</button>
                            </div>
                          )}
                        </div>
                      )}
                    />
                    <ErrorMessage name='options' />
                  </div>

                  <div className='formGroup col-span-full grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <button type='button' className='formButton bg-red-600 hover:bg-red-700' onClick={() => handleDelete()}><FontAwesomeIcon icon={faTrash} />&nbsp;Delete</button>
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

export default IndividualCommandListPage;
