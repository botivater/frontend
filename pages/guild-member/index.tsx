import type { NextPage } from 'next'
import Head from 'next/head'
import { useContext, useMemo } from 'react'
import { Column, useTable } from 'react-table'
import AppContext from '../../components/context/AppContext'
import AuthContext from '../../components/context/AuthContext'
import ErrorComponent from '../../components/errorComponent'
import Layout from '../../components/layout'
import Loading from '../../components/loading'
import { LoadingOverlay } from '../../components/LoadingOverlay'
import { useAllGuildMembers } from '../../lib/api/GuildMember.api'
import { GuildMember } from '../../lib/api/types/GuildMember'

const GuildMemberPage: NextPage = () => {
  const { isLoading, user } = useContext(AuthContext)!
  const { guildId } = useContext(AppContext)!

  const {
    error: allGuildMembersError,
    data: allGuildMembers,
    isLoading: isAllGuildMembersLoading,
  } = useAllGuildMembers(guildId)

  const data = useMemo<GuildMember[]>(
    () => allGuildMembers || [],
    [allGuildMembers]
  )
  const columns = useMemo<Column<GuildMember>[]>(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Created at',
        accessor: 'createdAt',
        Cell: (props: { value: string }) => {
          return (
            <span>
              {new Date(props.value).toLocaleString('nl', {
                dateStyle: 'long',
                timeStyle: 'medium',
              })}
            </span>
          )
        },
      },
      {
        Header: 'Updated at',
        accessor: 'updatedAt',
        Cell: (props: { value: string }) => {
          return (
            <span>
              {new Date(props.value).toLocaleString('nl', {
                dateStyle: 'long',
                timeStyle: 'medium',
              })}
            </span>
          )
        },
      },
      {
        Header: 'Snowflake',
        accessor: 'snowflake',
      },
      {
        Header: 'Display name',
        accessor: 'name',
      },
      {
        Header: 'Identifier',
        accessor: 'identifier',
      },
      {
        Header: 'Birthday',
        accessor: 'birthday',
        Cell: (props: { value: string }) => {
          return <span>{props.value ? props.value : 'Not set'}</span>
        },
      },
      {
        Header: 'Last activity',
        accessor: 'lastInteraction',
        Cell: (props: { value: string }) => {
          return (
            <span>
              {new Date(props.value).toLocaleString('nl', {
                dateStyle: 'long',
                timeStyle: 'medium',
              })}
            </span>
          )
        },
      },
      {
        Header: 'Is active',
        accessor: 'isActive',
        Cell: (props: { value: boolean }) => {
          return <span>{props.value ? 'Active' : 'Inactive'}</span>
        },
      },
    ],
    []
  )
  const table = useTable({ columns, data })

  if (allGuildMembersError) {
    console.error(allGuildMembersError)
    return <ErrorComponent message={allGuildMembersError.toString()} />
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <Layout>
      <>
        <Head>
          <title>Guild members</title>
        </Head>

        {isAllGuildMembersLoading && <LoadingOverlay />}

        {user && (
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4">
            <div>
              <h1 className="text-3xl font-bold">Guild members</h1>
              <p className="text-white text-opacity-30">
                An overview of the members.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">List</h2>
              <div className="overflow-x-scroll">
                <table {...table.getTableProps()} className="w-full rounded">
                  <thead className="bg-gray-900 text-left">
                    {table.headerGroups.map((headerGroup) => {
                      const { key, ...headerGroupProps } =
                        headerGroup.getHeaderGroupProps()

                      return (
                        <tr key={key} {...headerGroupProps}>
                          {headerGroup.headers.map((column) => {
                            const { key, ...headerProps } =
                              column.getHeaderProps()

                            return (
                              <th
                                key={key}
                                {...headerProps}
                                className="whitespace-nowrap p-2"
                              >
                                {column.render('Header')}
                              </th>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </thead>
                  <tbody {...table.getTableBodyProps()}>
                    {table.rows.map((row) => {
                      table.prepareRow(row)

                      const { key, ...rowProps } = row.getRowProps()

                      return (
                        <tr
                          key={key}
                          {...rowProps}
                          className="transition-all duration-75 odd:bg-gray-600 even:bg-gray-500 hover:bg-gray-900"
                        >
                          {row.cells.map((cell) => {
                            const { key, ...cellProps } = cell.getCellProps()

                            return (
                              <td
                                key={key}
                                {...cellProps}
                                className="whitespace-nowrap p-2"
                              >
                                {cell.render('Cell')}
                              </td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </>
    </Layout>
  )
}

export default GuildMemberPage
