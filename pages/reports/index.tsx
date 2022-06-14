import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useContext } from 'react'
import ReportCard from '../../components/cards/ReportCard'
import { useAppContext } from '../../components/context/AppContext'
import AuthContext from '../../components/context/AuthContext'
import ErrorComponent from '../../components/errorComponent'
import Layout from '../../components/layout'
import Loading from '../../components/loading'
import { sortReportsByIdDesc, useAllReports } from '../../lib/api/Report';

const ReportsPage: NextPage = () => {
    const { isLoading, user } = useContext(AuthContext)!;
    const { guildId } = useAppContext();

    const { error: allReportsError, data: allReportsData, isLoading: isAllReportsLoading } = useAllReports(guildId);

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
                        <div className='grid grid-cols-1 gap-4'>
                            {!isAllReportsLoading && allReportsData?.sort(sortReportsByIdDesc).map(report => <ReportCard reportId={report.id} key={report.id} />) }
                        </div>
                    </div>
                }
            </>
        </Layout>
    )
}

export default ReportsPage;
