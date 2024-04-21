import Link from 'next/link'
import React from 'react'
import { useReactionCollector } from '../../lib/api/Discord'

type Props = {
  reactionCollectorId: number
}

const ReactionCollectorCard: React.FC<Props> = ({ reactionCollectorId }) => {
  const { error, data, isLoading } = useReactionCollector(reactionCollectorId)

  if (error)
    return (
      <div
        className={
          'flex flex-col items-start justify-start rounded-md bg-gray-700 p-4 text-lg text-red-500 shadow-md'
        }
      >
        <p>
          Error occurred when loading reaction collector with id{' '}
          {reactionCollectorId}
        </p>
      </div>
    )
  if (isLoading)
    return (
      <div className="flex animate-pulse flex-col items-start justify-start gap-3 rounded-md bg-gray-700 p-4 shadow-md">
        <span className="h-7 w-3/4 rounded-md bg-black bg-opacity-20"></span>
        <span className="h-7 w-1/2 rounded-md bg-black bg-opacity-20"></span>
        <span className="h-7 w-1/2 rounded-md bg-black bg-opacity-20"></span>
      </div>
    )

  return (
    <Link href={`/flows/reaction/${reactionCollectorId}`}>
      <a
        className={
          'flex transform cursor-pointer flex-col items-start justify-start rounded-md bg-gray-700 p-4 text-lg shadow-md transition-all duration-300 hover:scale-105'
        }
      >
        <h1 className="font-bold">{data?.name}</h1>
        <small className="text-white text-opacity-30">
          {data?.description}
        </small>
        <small className="text-white text-opacity-30">
          Actions: {data?.commandFlows.length}
        </small>
      </a>
    </Link>
  )
}

export default ReactionCollectorCard
