import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { useAppContext } from '../../components/context/AppContext'
import AuthContext from '../../components/context/AuthContext'
import Layout from '../../components/layout'
import Loading from '../../components/loading'
import { useToken } from '../../hooks/use-token'
import { createCommandList } from '../../lib/api/CommandList'


const CommandListPage: NextPage = () => {
  const { isLoading, user } = useContext(AuthContext)!;
  const { guildId } = useAppContext();
  const token = useToken();
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState<string[]>([""]);

  const [submitting, setSubmitting] = useState(false);

  const updateOptions = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  }

  const addOption = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const newOptions = [...options, ""];
    setOptions(newOptions);
  }

  const deleteOption = (index: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Change this once the implementation changes on the server side.
    const data = {
      name,
      description,
      options,
      guildId: guildId
    };

    setSubmitting(true);

    try {
      const result = await createCommandList(token, data);

      setSubmitting(false);

      if (result) {
        router.push("/commands");
      } else {
        alert("An error occurred when submitting the form.");
      }
    } catch (err) {
      setSubmitting(false);
      console.error(err);
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
        {user &&
          <div className='max-w-6xl mx-auto px-4 flex flex-col gap-4'>
            <div>
              <h1 className='text-3xl font-bold'>Command lists</h1>
              <p className='text-white text-opacity-30'>Commands that randomly pick an item from a list.</p>
            </div>
            <div>
              <h2 className='text-2xl font-bold'>Command list editor</h2>
              <p className='text-white text-opacity-30'>Creating a new command list.</p>
            </div>
            <form className='grid grid-cols-1 sm:grid-cols-2 gap-4' onSubmit={(e) => handleSubmit(e)}>
              <div>
                <label htmlFor="name" className='block font-bold'>Name:</label>
                <div className='flex items-stretch justify-center bg-black bg-opacity-30 rounded-md'>
                  <div className='bg-black bg-opacity-60 flex items-center justify-center rounded-l-md'>
                    <span className='px-4'>/</span>
                  </div>
                  <input type="text" name="name" id="name" className='w-full rounded-r-md bg-transparent border-none' placeholder='selfcare' value={name} onChange={(e) => setName(e.currentTarget.value)} minLength={1} maxLength={32} />
                </div>
                <small className='block'>Please enter the command name here without the /.</small>
              </div>
              <div>
                <label htmlFor="description" className='block font-bold'>Description:</label>
                <input type="text" name="description" id="description" className='w-full rounded-md bg-black bg-opacity-30 border-none' placeholder='Laat de bot een self care tip geven!' value={description} onChange={(e) => setDescription(e.currentTarget.value)} minLength={1} maxLength={100} />
                <small className='block'>Please enter a short description for the command here.</small>
              </div>
              {options.map((option, index) =>
                <div key={index} className='col-span-full'>
                  <label htmlFor={`option${index}`} className='block font-bold'>Option {index + 1}:</label>
                  <div className='flex items-stretch justify-center bg-black bg-opacity-30 rounded-md'>
                    <input type="text" name={`option${index}`} id={`option${index}`} className='w-full rounded-l-md bg-transparent border-none' placeholder='' value={option} onChange={(e) => updateOptions(index, e)} />
                    <div className='bg-red-600 flex items-center justify-center rounded-r-md'>
                      <button className='px-4 h-full' onClick={(e) => deleteOption(index, e)}>Delete</button>
                    </div>
                  </div>
                  <small className='block'>Please enter a text here.</small>
                </div>
              )}
              <div>
                <button className='bg-blue-600 hover:bg-blue-700 rounded-md shadow-md py-2 px-4 transition-all duration-300 w-full' onClick={(e) => addOption(e)}>Add option</button>
              </div>
              <div>
                <button className='bg-green-600 hover:bg-green-700 rounded-md shadow-md py-2 px-4 transition-all duration-300 w-full' type='submit' disabled={submitting}>Create</button>
              </div>
            </form>
          </div>
        }
      </>
    </Layout>
  )
}

export default CommandListPage;
