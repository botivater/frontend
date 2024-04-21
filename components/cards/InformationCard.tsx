import classNames from 'classnames'
import React from 'react'

type Props = {
  loading: boolean
  title?: string
  value?: any
  suffix?: string
  color?: 'pink' | 'blue' | 'green' | 'red' | 'gray'
}

const InformationCard: React.FC<Props> = ({
  loading,
  title,
  value,
  suffix,
  color,
}) => {
  if (loading)
    return (
      <div className="flex animate-pulse flex-row items-center justify-between gap-3 rounded-md bg-gradient-to-br from-pink-500 to-purple-700 py-3 px-4 shadow-md">
        <span className="h-7 w-full rounded-md bg-black bg-opacity-20"></span>
        <span className="h-7 w-1/4 rounded-md bg-black bg-opacity-20"></span>
      </div>
    )

  return (
    <div
      className={classNames(
        'flex flex-row items-center justify-between rounded-md bg-gradient-to-br py-3 px-4 text-lg shadow-md',
        {
          'from-pink-500 to-purple-700': !color || color == 'pink',
          'from-purple-500 to-blue-700': color == 'blue',
          'from-lime-500 to-green-700': color == 'green',
          'from-orange-500 to-red-700': color == 'red',
          'from-slate-500 to-gray-700': color == 'gray',
        }
      )}
    >
      <h1 className="font-bold">{title}</h1>
      <p>
        <strong>{value}</strong>
        {suffix ? ` ${suffix}` : ''}
      </p>
    </div>
  )
}

export default InformationCard
