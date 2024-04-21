import { useCallback, useContext, useState } from 'react'
import { BaseEditor, createEditor, Descendant, Node } from 'slate'
import { Editable, ReactEditor, Slate, withReact } from 'slate-react'
import { useAllGuildChannels } from '../../lib/api/GuildChannel.api'
import { CustomEditor, CustomEditorType } from '../../lib/slate/CustomEditor'
import { CustomElement } from '../../lib/slate/CustomElement'
import { CustomText } from '../../lib/slate/CustomText'
import { renderElement } from '../../lib/slate/renderElement'
import { renderLeaf } from '../../lib/slate/renderLeaf'
import { Sorting } from '../../lib/Sorting'
import AppContext from '../context/AppContext'
import ErrorComponent from '../errorComponent'
import Loading from '../loading'
import { serialize } from 'remark-slate'

export type WelcomeMessageConfig = {
  channelSnowflake: string
  format: string
}

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditorType
    Element: CustomElement
    Text: CustomText
  }
}

export const WelcomeMessageConfig: React.FC<{
  welcomeMessageConfig: WelcomeMessageConfig
  setWelcomeMessageConfig: (welcomeMessageConfig: WelcomeMessageConfig) => void
}> = ({ welcomeMessageConfig, setWelcomeMessageConfig }) => {
  const { guildId } = useContext(AppContext)!

  const {
    error: allGuildChannelsError,
    data: allGuildChannels,
    isLoading: isAllGuildChannelsLoading,
  } = useAllGuildChannels(guildId)

  const setChannelSnowflake = (newValue: string) => {
    const { channelSnowflake, ...config } = welcomeMessageConfig

    setWelcomeMessageConfig({
      channelSnowflake: newValue,
      ...config,
    })
  }

  const setFormat = (newValue: string) => {
    const { format, ...config } = welcomeMessageConfig

    setWelcomeMessageConfig({
      format: newValue,
      ...config,
    })
  }

  const initialValue: Descendant[] = [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]

  const [editor] = useState(() => withReact(createEditor()))
  const renderElementWrapper = useCallback(renderElement, [])
  const renderLeafWrapper = useCallback(renderLeaf, [])

  if (allGuildChannelsError) {
    console.error(allGuildChannelsError)
    return <ErrorComponent message={allGuildChannelsError.toString()} />
  }

  if (isAllGuildChannelsLoading) {
    return <Loading />
  }

  return (
    <>
      <div>
        <label htmlFor="channelSnowflake" className="block font-bold">
          Channel:
        </label>
        <select
          name="channelSnowflake"
          id="channelSnowflake"
          className="w-full rounded border-none bg-black bg-opacity-30"
          value={welcomeMessageConfig.channelSnowflake}
          onChange={(e) => {
            setChannelSnowflake(e.target.value)
          }}
        >
          <option value="" className="bg-black bg-opacity-90">
            Select a channel...
          </option>
          {allGuildChannels &&
            allGuildChannels
              .sort(Sorting.sortGuildChannelsByNameAsc)
              .filter((guildChannel) => guildChannel.type === 'GuildText')
              .map((guildChannel) => (
                <option
                  key={guildChannel.snowflake}
                  value={guildChannel.snowflake}
                  className="bg-black bg-opacity-90"
                >
                  {guildChannel.name}
                </option>
              ))}
        </select>
        <small className="block">Select the welcome channel.</small>
      </div>
      <div className="col-span-full">
        <label htmlFor="format" className="block font-bold">
          Format:
        </label>
        {/* <textarea name="format" id="format" className='w-full bg-black bg-opacity-30 rounded border-none' value={welcomeMessageConfig.format} onChange={(e) => { setFormat(e.target.value) }} rows={10}></textarea> */}
        <div className="w-full rounded border-none bg-black bg-opacity-30 p-2">
          <Slate
            editor={editor}
            value={initialValue}
            onChange={(value) => {
              const isAstChange = editor.operations.some(
                (op) => op.type !== 'set_selection'
              )

              if (isAstChange) {
                console.log(value.map((v) => serialize(v)).join('\n'))
              }
            }}
          >
            <Editable
              renderElement={renderElementWrapper}
              renderLeaf={renderLeafWrapper}
              placeholder="Enter some text..."
              onKeyDown={(event) => {
                if (!event.ctrlKey) return

                switch (event.key) {
                  case 'b':
                    event.preventDefault()
                    CustomEditor.toggleBoldMark(editor)
                    break

                  case '`':
                    event.preventDefault()
                    CustomEditor.toggleCodeMark(editor)
                    break

                  case 'i':
                    event.preventDefault()
                    CustomEditor.toggleItalicMark(editor)
                    break

                  case 's':
                    event.preventDefault()
                    CustomEditor.toggleStrikethroughMark(editor)
                    break
                }
              }}
            />
          </Slate>
        </div>
        <small className="block">Enter a format.</small>
      </div>
    </>
  )
}
