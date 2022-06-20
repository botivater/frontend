import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const LoadingOverlay: React.FC<{}> = () => {
    return (
        <div className='z-50 fixed top-0 bottom-0 left-0 right-0 bg-gray-900 bg-opacity-80 min-h-screen h-full w-full overflow-hidden flex flex-col items-center justify-center text-center gap-2 will-change-scroll'>
            <FontAwesomeIcon className={'text-6xl'} icon={faSpinner} spin />
            <div>
                <h1 className='font-bold text-xl'>Loading</h1>
                <p>This may take a few seconds, please wait...</p>
            </div>
        </div>
    )
}