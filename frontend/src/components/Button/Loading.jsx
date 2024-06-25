import { PropTypes } from "prop-types"

const Loading = ({ children }) => {
  return (
    <div className="flex justify-center my-2">
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 bg-[#e5e7eb22] border-1 border-gray-800 rounded-md font-semibold text-xs text-gray-300 uppercase tracking-widest shadow-sm focus:outline-none disabled:opacity-25 transition ease-in-out duration-150 cursor-progress"
      >
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        {children}
      </button>
    </div>
  )
}

Loading.propTypes = {
  children: PropTypes.node
}

export default Loading
