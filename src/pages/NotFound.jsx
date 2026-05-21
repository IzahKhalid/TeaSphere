import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Leaf, Home, Users } from 'lucide-react'
import MagneticButton from '../components/MagneticButton'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <main className="relative flex min-h-[calc(100vh-8rem)] items-center justify-center overflow-hidden px-5 pt-28 pb-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/4 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-sage/25 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 h-80 w-80 rounded-full bg-gold/20 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="container-premium relative z-10 w-full max-w-2xl"
      >
        {/* Single centered stack — 404 watermark sits behind copy */}
        <div className="relative mx-auto flex flex-col items-center text-center">
          <span
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[clamp(7rem,22vw,13rem)] font-medium leading-none tracking-tighter text-forest/[0.06]"
            aria-hidden
          >
            404
          </span>

          <Leaf className="mb-5 h-10 w-10 text-gold" strokeWidth={1.25} />

          <p className="section-eyebrow mb-4">Lost in the garden</p>

          <h1 className="heading-section max-w-lg text-balance">
            This cup hasn&apos;t been steeped yet.
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-charcoal/70">
            The page you&apos;re looking for may have been moved, removed, or never existed.
            Let&apos;s get you back to familiar leaves.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton onClick={() => navigate('/')}>
              <Home className="h-4 w-4" />
              Back to Home
            </MagneticButton>
            <MagneticButton variant="outline" onClick={() => navigate('/users')}>
              <Users className="h-4 w-4" />
              Browse Community
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </main>
  )
}

export default NotFound
