import LoadingSpinner from './LoadingSpinner'

/**
 * Centered full-section loading with spinner and optional message.
 */
const LoadingState = ({
  label = 'Steeping your tea…',
  minHeight = 'min-h-[50vh]',
  className = '',
}) => (
  <div
    className={`flex w-full items-center justify-center px-5 py-20 ${minHeight} ${className}`}
  >
    <LoadingSpinner size="lg" label={label} />
  </div>
)

export default LoadingState
