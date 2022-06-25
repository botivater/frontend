import React from "react";
import { RenderElementProps } from "slate-react";


export const renderElement = (props: RenderElementProps) => {
    switch (props.element.type) {
        case 'block-quote':
            return <BlockQuoteElement {...props} />
        case 'code':
            return <CodeElement {...props} />
        default:
            return <DefaultElement {...props} />
    }
};

const BlockQuoteElement = (props: RenderElementProps) => {
    return (
        <blockquote {...props.attributes} className="border-l-4 pl-3 py-1">
            {props.children}
        </blockquote>
    )
}

const CodeElement = (props: RenderElementProps) => {
    return (
        <pre {...props.attributes} className="bg-gray-800 border border-black p-2 rounded">
            <code>{props.children}</code>
        </pre>
    )
}

const DefaultElement = (props: RenderElementProps) => {
    return <p {...props.attributes}>{props.children}</p>
}
