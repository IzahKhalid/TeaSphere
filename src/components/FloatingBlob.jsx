import { motion } from 'framer-motion'

const FloatingBlob = ({ className, delay = 0, duration = 10 }) => {
  return (
    <motion.div
      className={`absolute rounded-full mix-blend-multiply filter blur-3xl opacity-20 ${className}`}
      animate={{
        x: ['0%', '10%', '-10%', '0%'],
        y: ['0%', '-10%', '10%', '0%'],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: 'reverse',
        delay: delay,
      }}
    />
  )
}

export default FloatingBlob