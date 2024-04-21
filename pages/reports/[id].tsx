import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../components/context/AppContext'
import AuthContext from '../../components/context/AuthContext'
import ErrorComponent from '../../components/errorComponent'
import Layout from '../../components/layout'
import Loading from '../../components/loading'
import { useToken } from '../../hooks/use-token'
import { useDiscordGuildChannels } from '../../lib/api/Discord'
import { updateReport, useReport } from '../../lib/api/Report'

const ReportPage: NextPage = () => {
  const { isLoading, user } = useContext(AuthContext)!
  const { guildId } = useContext(AppContext)!
  const token = useToken()
  const router = useRouter()
  const { id } = router.query

  const [resolved, setResolved] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const {
    error: reportError,
    data: reportData,
    isLoading: isReportLoading,
  } = useReport(parseInt(id as string))
  const {
    error: channelError,
    data: channelData,
    isLoading: isChannelLoading,
  } = useDiscordGuildChannels(guildId)

  useEffect(() => {
    setResolved(reportData?.resolved || false)
  }, [reportData])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const id = reportData?.id
    if (!id) throw new Error('Report ID not set.')

    const data = {
      resolved,
    }

    setSubmitting(true)

    try {
      const result = await updateReport(token, data, id)

      setSubmitting(false)

      if (result) {
        router.push('/reports')
      } else {
        alert('An error occurred when submitting the form.')
      }
    } catch (err) {
      setSubmitting(false)
      console.error(err)
    }

    setSubmitting(false)
  }

  if (reportError) {
    console.error(reportError)
    return <ErrorComponent message={reportError.toString()} />
  }

  if (channelError) {
    console.error(channelError)
    return <ErrorComponent message={channelError.toString()} />
  }

  if (isLoading || isReportLoading || isChannelLoading) {
    return <Loading />
  }

  if (!reportData) {
    return <ErrorComponent message="No component was rendered!" />
  }

  return (
    <Layout>
      <>
        <Head>
          <title>Viewing report</title>
        </Head>
        {user && (
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4">
            <div>
              <h1 className="text-3xl font-bold">Reports</h1>
              <p className="text-white text-opacity-30">
                Reports that have been submitted by users.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Report</h2>
              <p className="text-white text-opacity-30">
                Viewing report: #{reportData.id}
              </p>
            </div>
            <form
              className="grid grid-cols-1 gap-4 lg:grid-cols-2"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div>
                <label htmlFor="channelId" className="block font-bold">
                  Channel:
                </label>
                <div className="flex items-stretch justify-center rounded-md bg-black bg-opacity-30">
                  <div className="flex items-center justify-center rounded-l-md bg-black bg-opacity-60">
                    <span className="px-4">#</span>
                  </div>
                  <input
                    type="text"
                    name="channelId"
                    id="channelId"
                    className="w-full rounded-r-md border-none bg-transparent"
                    value={
                      channelData?.find(
                        (channel) => channel.id === reportData.channelId
                      )?.name
                    }
                    disabled
                  />
                </div>
                <small className="block">
                  Channel where the report has been submitted.
                </small>
              </div>
              {reportData.description !== '' && (
                <div className="col-span-full">
                  <label htmlFor="description" className="block font-bold">
                    Description:
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    className="w-full rounded-md border-none bg-black bg-opacity-30"
                    value={reportData.description}
                    rows={6}
                    disabled
                  />
                  <small className="block">Description of the report.</small>
                </div>
              )}
              {reportData.reportedGuildMember && (
                <div>
                  <label htmlFor="user" className="block font-bold">
                    User:
                  </label>
                  <div className="flex items-stretch justify-center rounded-md bg-black bg-opacity-30">
                    <div className="flex items-center justify-center rounded-l-md bg-black bg-opacity-60">
                      <span className="px-4">@</span>
                    </div>
                    <input
                      type="text"
                      name="user"
                      id="user"
                      className="w-full rounded-r-md border-none bg-transparent"
                      value={`${reportData.reportedGuildMember.name} (${reportData.reportedGuildMember.identifier})`}
                      disabled
                    />
                  </div>
                  <small className="block">User that was reported.</small>
                </div>
              )}

              <div>
                <label htmlFor="anonymous" className="block font-bold">
                  Anonymous:
                </label>
                <input
                  type="text"
                  name="anonymous"
                  id="anonymous"
                  className="w-full rounded-md border-none bg-black bg-opacity-30"
                  value={reportData.anonymous ? 'Yes' : 'No'}
                  disabled
                />
                <small className="block">
                  Did the submitter report anonymously?
                </small>
              </div>

              {!reportData.anonymous && (
                <div>
                  <label htmlFor="guildMember" className="block font-bold">
                    Submitter:
                  </label>
                  <div className="flex items-stretch justify-center rounded-md bg-black bg-opacity-30">
                    <div className="flex items-center justify-center rounded-l-md bg-black bg-opacity-60">
                      <span className="px-4">@</span>
                    </div>
                    <input
                      type="text"
                      name="guildMember"
                      id="guildMember"
                      className="w-full rounded-r-md border-none bg-transparent"
                      value={`${reportData.guildMember.name} (${reportData.guildMember.identifier})`}
                      disabled
                    />
                  </div>
                  <small className="block">
                    User that created this report.
                  </small>
                </div>
              )}

              <div className="col-start-1">
                <label htmlFor="resolved" className="block font-bold">
                  Resolved:
                </label>
                <select
                  name="resolved"
                  id="resolved"
                  className="w-full rounded-md border-none bg-black bg-opacity-30"
                  value={Number(resolved)}
                  onChange={(e) =>
                    setResolved(
                      parseInt(e.currentTarget.value) === 0 ? false : true
                    )
                  }
                >
                  <option value={0} className="bg-black bg-opacity-90">
                    No
                  </option>
                  <option value={1} className="bg-black bg-opacity-90">
                    Yes
                  </option>
                </select>
                <small className="block">Has this report been resolved?</small>
              </div>

              <div className="col-span-full">
                <button
                  className="w-full rounded-md bg-green-600 py-2 px-4 shadow-md transition-all duration-300 hover:bg-green-700"
                  type="submit"
                  disabled={submitting}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </>
    </Layout>
  )
}

export default ReportPage
