import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import LoadingSpinner from './LoadingSpinner'

/**
 * Brief overlay spinner when navigating between routes.
 */
const PageLoader = () => {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
    const t = setTimeout(() => setVisible(false), 450)
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-cream/40 backdrop-blur-[2px]"
          aria-hidden
        >
          <LoadingSpinner size="md" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PageLoader
