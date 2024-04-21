import React from 'react'

type Props = {
  index: number
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const FlowActionCheckValueInput: React.FC<Props> = ({
  index,
  value,
  setValue,
}) => {
  return (
    <div>
      <label htmlFor={`checkValue${index}`} className="block font-bold">
        Check value:
      </label>
      <input
        type="text"
        name={`checkValue${index}`}
        id={`checkValue${index}`}
        className="w-full rounded-md border-none bg-black bg-opacity-30"
        placeholder="Emoji..."
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      <small className="block">Please enter a value to check for here.</small>
    </div>
  )
}

export default FlowActionCheckValueInput
