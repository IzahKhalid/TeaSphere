import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Magnetic hover button with spring follow + ripple feel
 */
const MagneticButton = ({
  children,
  onClick,
  type = 'button',
  className = '',
  variant = 'primary',
  disabled = false,
}) => {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMove = (e) => {
    if (!ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    setPos({
      x: (e.clientX - (left + width / 2)) * 0.25,
      y: (e.clientY - (top + height / 2)) * 0.25,
    })
  }

  const base =
    variant === 'outline'
      ? 'btn-outline-tea'
      : variant === 'gold'
        ? 'rounded-full bg-gold px-8 py-3.5 text-sm font-medium text-white shadow-glow hover:bg-gold/90'
        : 'btn-primary'

  return (
    <motion.button
      ref={ref}
      type={type}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 280, damping: 18 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${className} ${disabled ? 'pointer-events-none opacity-60' : ''}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      <motion.span
        className="absolute inset-0 rounded-full bg-white/10"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 2.5, opacity: 1 }}
        transition={{ duration: 0.4 }}
      />
    </motion.button>
  )
}

export default MagneticButton
