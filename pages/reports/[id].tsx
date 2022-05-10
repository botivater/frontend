import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../components/context/AppContext'
import ErrorComponent from '../../components/errorComponent'
import Layout from '../../components/layout'
import Loading from '../../components/loading'
import { useToken } from '../../hooks/use-token'
import CommandList from '../../lib/api/CommandList';
import Discord from '../../lib/api/Discord'
import GuildMember from '../../lib/api/GuildMember'
import Report from '../../lib/api/Report'


const ReportPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, user } = useAuth0()
  const token = useToken();
  const { guildId } = useAppContext();

  const [resolved, setResolved] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { error: reportError, data: reportData, isLoading: isReportLoading } = Report.useReport(parseInt(id as string));
  const { error: channelError, data: channelData, isLoading: isChannelLoading } = Discord.useDiscordGuildChannels(guildId);
  const { error: submitterGuildMemberError, data: submitterGuildMemberData, isLoading: isSubmitterGuildMemberLoading } = GuildMember.useGuildMember(reportData?.guildMember);
  const { error: reportedGuildMemberError, data: reportedGuildMemberData, isLoading: isReportedGuildMemberLoading } = GuildMember.useGuildMember(reportData?.user);

  useEffect(() => {
    setResolved(reportData?.resolved || false);
  }, [reportData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = reportData?.id;
    if (!id) throw new Error("Report ID not set.");

    const data = {
      resolved,
    };

    setSubmitting(true);

    try {
      const result = await Report.updateReport(token, data, id);

      setSubmitting(false);

      if (result) {
        router.push("/reports");
      } else {
        alert("An error occurred when submitting the form.");
      }
    } catch (err) {
      setSubmitting(false);
      console.error(err);
    }

    setSubmitting(false);
  }

  if (reportError) {
    console.error(reportError);
    return <ErrorComponent message={reportError.toString()} />
  }

  if (channelError) {
    console.error(channelError);
    return <ErrorComponent message={channelError.toString()} />
  }

  if (submitterGuildMemberError) {
    console.error(submitterGuildMemberError);
    return <ErrorComponent message={submitterGuildMemberError.toString()} />
  }

  if (reportedGuildMemberError) {
    console.error(reportedGuildMemberError);
    return <ErrorComponent message={reportedGuildMemberError.toString()} />
  }

  if (isLoading || isReportLoading || isChannelLoading) {
    return <Loading />
  }

  if (!reportData) {
    return <ErrorComponent message='No component was rendered!' />
  }

  return (
    <Layout>
      <>
        <Head>
          <title>Viewing report</title>
        </Head>
        {user &&
          <div className='max-w-6xl mx-auto px-4 flex flex-col gap-4'>
            <div>
              <h1 className='text-3xl font-bold'>Reports</h1>
              <p className='text-white text-opacity-30'>Reports that have been submitted by users.</p>
            </div>
            <div>
              <h2 className='text-2xl font-bold'>Report</h2>
              <p className='text-white text-opacity-30'>Viewing report: #{reportData.id}</p>
            </div>
            <form className='grid grid-cols-1 lg:grid-cols-2 gap-4' onSubmit={(e) => handleSubmit(e)}>
              <div>
                <label htmlFor="channelId" className='block font-bold'>Channel:</label>
                <div className='flex items-stretch justify-center bg-black bg-opacity-30 rounded-md'>
                  <div className='bg-black bg-opacity-60 flex items-center justify-center rounded-l-md'>
                    <span className='px-4'>#</span>
                  </div>
                  <input type="text" name="channelId" id="channelId" className='w-full rounded-r-md bg-transparent border-none' value={channelData?.find(channel => channel.id === reportData.channelId)?.name} disabled />
                </div>
                <small className='block'>Channel where the report has been submitted.</small>
              </div>
              {reportData.description !== "" &&
                <div className='col-span-full'>
                  <label htmlFor="description" className='block font-bold'>Description:</label>
                  <textarea name="description" id="description" className='w-full rounded-md bg-black bg-opacity-30 border-none' value={reportData.description} rows={6} disabled />
                  <small className='block'>Description of the report.</small>
                </div>
              }
              {reportData.user &&
                <div>
                  <label htmlFor="user" className='block font-bold'>User:</label>
                  <div className='flex items-stretch justify-center bg-black bg-opacity-30 rounded-md'>
                    <div className='bg-black bg-opacity-60 flex items-center justify-center rounded-l-md'>
                      <span className='px-4'>@</span>
                    </div>
                    <input type="text" name="user" id="user" className='w-full rounded-r-md bg-transparent border-none' value={`${reportedGuildMemberData?.name} (${reportedGuildMemberData?.identifier})`} disabled />
                  </div>
                  <small className='block'>User that was reported.</small>
                </div>
              }

              <div>
                <label htmlFor="anonymous" className='block font-bold'>Anonymous:</label>
                <input type="text" name="anonymous" id="anonymous" className='w-full rounded-md bg-black bg-opacity-30 border-none' value={reportData.anonymous ? 'Yes' : 'No'} disabled />
                <small className='block'>Did the submitter report anonymously?</small>
              </div>

              {!reportData.anonymous &&
                <div>
                  <label htmlFor="guildMember" className='block font-bold'>Submitter:</label>
                  <div className='flex items-stretch justify-center bg-black bg-opacity-30 rounded-md'>
                    <div className='bg-black bg-opacity-60 flex items-center justify-center rounded-l-md'>
                      <span className='px-4'>@</span>
                    </div>
                    <input type="text" name="guildMember" id="guildMember" className='w-full rounded-r-md bg-transparent border-none' value={`${submitterGuildMemberData?.name} (${submitterGuildMemberData?.identifier})`} disabled />
                  </div>
                  <small className='block'>User that created this report.</small>
                </div>
              }

              <div className='col-start-1'>
                <label htmlFor="resolved" className='block font-bold'>Resolved:</label>
                <select name="resolved" id="resolved" className='w-full rounded-md bg-black bg-opacity-30 border-none' value={Number(resolved)} onChange={(e) => setResolved(parseInt(e.currentTarget.value) === 0 ? false : true)}>
                  <option value={0} className='bg-black bg-opacity-90'>No</option>
                  <option value={1} className='bg-black bg-opacity-90'>Yes</option>
                </select>
                <small className='block'>Has this report been resolved?</small>
              </div>

              <div className='col-span-full'>
                <button className='bg-green-600 hover:bg-green-700 rounded-md shadow-md py-2 px-4 transition-all duration-300 w-full' type='submit' disabled={submitting}>Save</button>
              </div>
            </form>
          </div>
        }
      </>
    </Layout>
  )
}

export default withAuthenticationRequired(ReportPage);
