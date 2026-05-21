import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/** Soft cursor-follow glow for premium feel */
const CursorGlow = () => {
  const [visible, setVisible] = useState(false)
  const x = useMotionValue(-500)
  const y = useMotionValue(-500)
  const springX = useSpring(x, { stiffness: 120, damping: 22 })
  const springY = useSpring(y, { stiffness: 120, damping: 22 })

  useEffect(() => {
    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove)
    document.body.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.body.removeEventListener('mouseleave', onLeave)
    }
  }, [visible, x, y])

  return (
    <motion.div
      className="cursor-glow hidden lg:block"
      style={{ left: springX, top: springY }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.35 }}
      aria-hidden
    />
  )
}

export default CursorGlow
