import React from 'react'

type Props = {
  value: string[]
  setValue: React.Dispatch<React.SetStateAction<string[]>>
}

const FlowReactionInput: React.FC<Props> = ({ value, setValue }) => {
  const updateReactionsList = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newOptions = [...value]
    newOptions[index] = event.target.value
    setValue(newOptions)
  }

  const addReaction = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    const newOptions = [...value, '']
    setValue(newOptions)
  }

  const deleteReaction = (
    index: number,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    const newOptions = [...value]
    newOptions.splice(index, 1)
    setValue(newOptions)
  }

  return (
    <>
      {value.map((option, index) => (
        <div key={index} className="col-span-full">
          <label htmlFor={`reaction${index}`} className="block font-bold">
            Reaction {index + 1}:
          </label>
          <div className="flex items-stretch justify-center rounded-md bg-black bg-opacity-30">
            <input
              type="text"
              name={`reactionsList`}
              id={`reaction${index}`}
              className="w-full rounded-l-md border-none bg-transparent"
              placeholder="Emoji..."
              value={option}
              onChange={(e) => updateReactionsList(index, e)}
            />
            <div className="flex items-center justify-center rounded-r-md bg-red-600">
              <button
                className="h-full px-4"
                onClick={(e) => deleteReaction(index, e)}
              >
                Delete
              </button>
            </div>
          </div>
          <small className="block">Please enter an emoji here.</small>
        </div>
      ))}
      <div className="col-span-full grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <button
          className="w-full rounded-md bg-blue-600 py-2 px-4 shadow-md transition-all duration-300 hover:bg-blue-700 disabled:bg-gray-600"
          onClick={(e) => addReaction(e)}
        >
          Add reaction
        </button>
      </div>
    </>
  )
}

export default FlowReactionInput
