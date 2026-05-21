import { motion } from 'framer-motion'
import { AlertCircle, RefreshCw } from 'lucide-react'
import MagneticButton from './MagneticButton'

const ErrorState = ({ onRetry, message = 'Something went wrong' }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.94 }}
    animate={{ opacity: 1, scale: 1 }}
    className="glass-panel mx-auto max-w-lg px-8 py-16 text-center"
  >
    <motion.div
      animate={{ rotate: [0, 8, -8, 0] }}
      transition={{ duration: 0.6, repeat: 2 }}
    >
      <AlertCircle className="mx-auto mb-6 h-16 w-16 text-gold" strokeWidth={1.25} />
    </motion.div>
    <h3 className="heading-section mb-3 text-2xl">Unable to steep the data</h3>
    <p className="mb-8 text-charcoal/70">{message}</p>
    <MagneticButton onClick={onRetry} variant="gold">
      <RefreshCw className="h-4 w-4" />
      Retry
    </MagneticButton>
  </motion.div>
)

export default ErrorState
