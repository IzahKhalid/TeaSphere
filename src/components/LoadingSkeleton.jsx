import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '../animations/variants'
import LoadingSpinner from './LoadingSpinner'

/** Shimmer skeleton grid with spinner — optional combined loading UI */
const LoadingSkeleton = ({ count = 6, showSpinner = true, label = 'Loading…' }) => (
  <div>
    {showSpinner && (
      <div className="mb-10 flex justify-center">
        <LoadingSpinner size="md" label={label} />
      </div>
    )}
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          variants={staggerItem}
          className="glass-panel overflow-hidden p-6"
        >
          <div className="skeleton-shimmer mx-auto mb-5 h-20 w-20 rounded-full" />
          <div className="skeleton-shimmer mb-3 h-5 w-3/4 rounded-lg" />
          <div className="skeleton-shimmer mb-2 h-4 w-1/2 rounded-lg" />
          <div className="skeleton-shimmer mb-2 h-3 w-full rounded" />
          <div className="skeleton-shimmer h-3 w-5/6 rounded" />
        </motion.div>
      ))}
    </motion.div>
  </div>
)

export default LoadingSkeleton
