import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const LoadingOverlay: React.FC<{}> = () => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex h-full min-h-screen w-full flex-col items-center justify-center gap-2 overflow-hidden bg-gray-900 bg-opacity-80 text-center will-change-scroll">
      <FontAwesomeIcon className={'text-6xl'} icon={faSpinner} spin />
      <div>
        <h1 className="text-xl font-bold">Loading</h1>
        <p>This may take a few seconds, please wait...</p>
      </div>
    </div>
  )
}
