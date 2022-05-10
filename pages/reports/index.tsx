import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ReportCard from '../../components/cards/ReportCard'
import ErrorComponent from '../../components/errorComponent'
import Layout from '../../components/layout'
import Loading from '../../components/loading'
import Report from '../../lib/api/Report';

const ReportsPage: NextPage = () => {
    const { isLoading, user } = useAuth0()

    const { error: allReportsError, data: allReportsData, isLoading: isAllReportsLoading } = Report.useAllReports();

    if (allReportsError) {
        console.error(allReportsError);
        return <ErrorComponent message={allReportsError.toString()} />
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <Layout>
            <>
                <Head>
                    <title>Reports</title>
                </Head>
                {user &&
                    <div className='max-w-6xl mx-auto px-4 flex flex-col gap-4'>
                        <div>
                            <h1 className='text-3xl font-bold'>Reports</h1>
                            <p className='text-white text-opacity-30'>Reports that have been submitted by users.</p>
                        </div>
                        {/* <h2 className='text-2xl font-bold'>Reports</h2> */}
                        {/* <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                            {!allCommandListsIsLoading && allCommandListsData?.map(commandList => <CommandListCard commandListId={commandList.id} key={commandList.id} />)}
                        </div> */}
                        <div className='grid grid-cols-1 gap-4'>
                            {!isAllReportsLoading && allReportsData?.sort(Report.sortReportsByIdDesc).map(report => <ReportCard reportId={report.id} key={report.id} />) }
                        </div>
                    </div>
                }
            </>
        </Layout>
    )
}

export default withAuthenticationRequired(ReportsPage);
