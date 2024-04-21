import classNames from 'classnames'
import { RenderLeafProps } from 'slate-react'

export const renderLeaf = (props: RenderLeafProps) => {
  return <Leaf {...props} />
}

const Leaf = (props: RenderLeafProps) => {
  return (
    <span
      {...props.attributes}
      className={classNames({
        'font-bold': props.leaf.bold,
        'bg-gray-800 p-1 font-mono': props.leaf.code,
        italic: props.leaf.italic,
        'line-through': props.leaf.strikeThrough,
      })}
    >
      {props.children}
    </span>
  )
}
