import { motion } from 'framer-motion'
import { pageTransition } from '../animations/variants'

/** Wraps route content with smooth enter/exit */
const PageTransition = ({ children }) => (
  <motion.div
    variants={pageTransition}
    initial="initial"
    animate="animate"
    exit="exit"
    className="min-h-screen"
  >
    {children}
  </motion.div>
)

export default PageTransition
