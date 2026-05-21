import { motion } from 'framer-motion'
import { Leaf } from 'lucide-react'

const SIZES = {
  sm: { ring: 'h-5 w-5 border', leaf: 'h-2.5 w-2.5', gap: 'gap-0' },
  md: { ring: 'h-10 w-10 border-2', leaf: 'h-4 w-4', gap: 'gap-2' },
  lg: { ring: 'h-14 w-14 border-2', leaf: 'h-5 w-5', gap: 'gap-3' },
  xl: { ring: 'h-20 w-20 border-[3px]', leaf: 'h-7 w-7', gap: 'gap-4' },
}

/**
 * Tea-inspired loading spinner — rotating ring with leaf accent.
 */
const LoadingSpinner = ({ size = 'md', label, className = '' }) => {
  const s = SIZES[size] ?? SIZES.md

  return (
    <div
      className={`inline-flex flex-col items-center justify-center ${s.gap} ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={label || 'Loading'}
    >
      <div className="relative flex items-center justify-center">
        <motion.span
          className={`block rounded-full border-sand/35 border-t-gold border-r-forest/80 ${s.ring}`}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
        />
        {size !== 'sm' && (
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Leaf className={`text-forest/50 ${s.leaf}`} strokeWidth={1.5} />
          </motion.span>
        )}
      </div>
      {label && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm font-medium tracking-wide text-charcoal/60"
        >
          {label}
        </motion.p>
      )}
    </div>
  )
}

export default LoadingSpinner
