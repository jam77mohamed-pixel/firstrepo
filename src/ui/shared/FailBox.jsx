const FailBox = ({ message, onRetry }) => (
  <div className="mx-auto my-16 max-w-lg rounded-md border border-orange-200 bg-orange-50 p-6 text-center">
    <h2 className="text-lg font-semibold text-orange-800">Request failed</h2>
    <p className="mt-2 text-orange-700">{message}</p>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-md bg-orange-700 px-4 py-2 text-white hover:bg-orange-800"
      >
        Try again
      </button>
    )}
  </div>
)

export default FailBox
