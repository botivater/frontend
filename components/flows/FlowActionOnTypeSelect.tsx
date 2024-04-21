import React from 'react'
import { OnType } from './FlowActionGroupInput'

type Props = {
  index: number
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>
}

const FlowActionOnTypeSelect: React.FC<Props> = ({
  index,
  value,
  setValue,
}) => {
  return (
    <div>
      <label htmlFor={`onType${index}`} className="block font-bold">
        On:
      </label>
      <div className="flex items-stretch justify-center rounded-md bg-black bg-opacity-30">
        <div className="flex items-center justify-center rounded-l-md bg-black bg-opacity-60">
          <span className="px-4">On</span>
        </div>
        <select
          name={`onType${index}`}
          id={`onType${index}`}
          className="w-full rounded-r-md border-none bg-transparent"
          value={value}
          onChange={(e) => setValue(parseInt(e.currentTarget.value))}
        >
          <option value={OnType.NONE} className="bg-black bg-opacity-90">
            None
          </option>
          <option
            value={OnType.REACTION_ADD}
            className="bg-black bg-opacity-90"
          >
            Reaction added
          </option>
          <option
            value={OnType.REACTION_REMOVE}
            className="bg-black bg-opacity-90"
          >
            Reaction removed
          </option>
        </select>
      </div>
      <small className="block">Please select the on type here.</small>
    </div>
  )
}

export default FlowActionOnTypeSelect
