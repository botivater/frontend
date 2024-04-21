import React from 'react'
import { RenderElementProps } from 'slate-react'

export const renderElement = (props: RenderElementProps) => {
  switch (props.element.type) {
    case 'block-quote':
      return <BlockQuoteElement {...props} />
    case 'code':
      return <CodeElement {...props} />
    default:
      return <DefaultElement {...props} />
  }
}

const BlockQuoteElement = (props: RenderElementProps) => {
  return (
    <blockquote {...props.attributes} className="border-l-4 py-1 pl-3">
      {props.children}
    </blockquote>
  )
}

const CodeElement = (props: RenderElementProps) => {
  return (
    <pre
      {...props.attributes}
      className="rounded border border-black bg-gray-800 p-2"
    >
      <code>{props.children}</code>
    </pre>
  )
}

const DefaultElement = (props: RenderElementProps) => {
  return <p {...props.attributes}>{props.children}</p>
}
