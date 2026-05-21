import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Leaf, Heart, Globe, Sprout } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import MagneticButton from '../components/MagneticButton'
import { staggerContainer, staggerItem } from '../animations/variants'

/** Animated counter for statistics */
const AnimatedStat = ({ value, suffix = '', label }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1400
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      setDisplay(Math.round(value * progress))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value])

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-5xl text-gold lg:text-6xl">
        {display}
        {suffix}
      </p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/60">
        {label}
      </p>
    </div>
  )
}

const VALUES = [
  { icon: Leaf, title: 'Quality, Without Pretense', desc: 'Every profile presented with editorial care.' },
  { icon: Heart, title: 'Care for People & Planet', desc: 'Built for real connections, not vanity metrics.' },
  { icon: Globe, title: 'Transparent Sourcing', desc: 'Live data from JSONPlaceholder — honest and open.' },
  { icon: Sprout, title: 'Organic Growth', desc: 'A directory that grows with your community.' },
]

const About = () => {
  const navigate = useNavigate()

  return (
    <main>
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-forest text-cream">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1600&auto=format&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="container-premium relative py-28 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-eyebrow text-gold"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-display text-cream"
          >
            A great cup starts with a careful pluck.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mx-auto mt-6 max-w-xl text-cream/80"
          >
            The top two leaves and a bud — that same intention guides TeaSphere User Directory.
          </motion.p>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="container-premium">
          <ScrollReveal>
            <div className="grid items-center gap-14 lg:grid-cols-2">
              <div>
                <p className="section-eyebrow">Our origins</p>
                <h2 className="font-display text-4xl lowercase text-forest sm:text-5xl">
                  born in the pacific northwest
                </h2>
                <p className="mt-6 leading-relaxed text-charcoal/75">
                  Our founder started TeaSphere in pursuit of a truly great experience. Two decades
                  later, that same care and curiosity guide everything we make — from cinematic heroes
                  to the smallest hover animation on a card.
                </p>
                <p className="mt-4 leading-relaxed text-charcoal/75">
                  Inspired by brands like Two Leaves and a Bud, we believe premium design should feel
                  warm, organic, and effortless — never cold or corporate.
                </p>
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lift"
              >
                <img
                  src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1200&auto=format&fit=crop"
                  alt="Tea plantation"
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-y border-sand/50 bg-white/30 py-20 backdrop-blur-sm">
        <div className="container-premium">
          <div className="grid gap-12 sm:grid-cols-3">
            <AnimatedStat value={20} suffix="+" label="Years of care" />
            <AnimatedStat value={100} suffix="%" label="Organic design" />
            <AnimatedStat value={10} suffix="k" label="Happy visitors" />
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="container-premium">
          <ScrollReveal className="mb-14 text-center">
            <h2 className="heading-section">What we stand for</h2>
          </ScrollReveal>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={staggerItem}
                whileHover={{ y: -8 }}
                className="glass-panel p-8 text-center"
              >
                <Icon className="mx-auto mb-4 h-10 w-10 text-gold" strokeWidth={1.25} />
                <h3 className="font-display text-xl text-forest">{title}</h3>
                <p className="mt-3 text-sm text-charcoal/65">{desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <ScrollReveal className="mt-16 text-center">
            <MagneticButton onClick={() => navigate('/users')}>Meet the Community</MagneticButton>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}

export default About
