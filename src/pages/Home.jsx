import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Leaf, ArrowRight, Quote } from 'lucide-react'
import MagneticButton from '../components/MagneticButton'
import ScrollReveal from '../components/ScrollReveal'
import UserCard from '../components/UserCard'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorState from '../components/ErrorState'
import { fetchUsers } from '../services/api'
import { heroText, staggerContainer, staggerItem } from '../animations/variants'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=2070&auto=format&fit=crop'

const Home = () => {
  const navigate = useNavigate()
  const [featured, setFeatured] = useState([])
  const [loadingFeatured, setLoadingFeatured] = useState(true)
  const [errorFeatured, setErrorFeatured] = useState(null)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 600], [0, 180])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3])

  const loadFeatured = useCallback(async () => {
    setLoadingFeatured(true)
    setErrorFeatured(null)
    try {
      const data = await fetchUsers()
      setFeatured(data.slice(0, 3))
    } catch (err) {
      setErrorFeatured(err?.message || 'Failed to load featured members')
      setFeatured([])
    } finally {
      setLoadingFeatured(false)
    }
  }, [])

  useEffect(() => {
    loadFeatured()
  }, [loadFeatured])

  return (
    <main>
      {/* Cinematic hero — Two Leaves "A cup that fits the moment" */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 bg-cover bg-center"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={HERO_IMAGE} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-hero-gradient" />
        </motion.div>

        <div className="container-premium relative z-10 py-32 text-center text-cream">
          <motion.div custom={0} variants={heroText} initial="hidden" animate="visible">
            <Leaf className="mx-auto mb-6 h-12 w-12 text-gold" strokeWidth={1.25} />
          </motion.div>
          <motion.p custom={1} variants={heroText} initial="hidden" animate="visible" className="section-eyebrow text-gold">
            TeaSphere User Directory
          </motion.p>
          <motion.h1
            custom={2}
            variants={heroText}
            initial="hidden"
            animate="visible"
            className="heading-display mx-auto max-w-4xl text-balance text-cream"
          >
            A community that fits the{' '}
            <span className="italic text-gold">moment.</span>
          </motion.h1>
          <motion.p
            custom={3}
            variants={heroText}
            initial="hidden"
            animate="visible"
            className="mx-auto mt-6 max-w-xl text-lg text-cream/85"
          >
            From whole-leaf enthusiasts to ceremonial matcha lovers — discover members
            steeped in curiosity, just like Two Leaves and a Bud.
          </motion.p>
          <motion.div
            custom={4}
            variants={heroText}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticButton variant="gold" onClick={() => navigate('/menu')}>
              Shop Tea Menu
            </MagneticButton>
            <MagneticButton
              variant="outline"
              onClick={() => navigate('/users')}
              className="!border-cream/60 !text-cream hover:!bg-cream/10 hover:!text-cream"
            >
              Discover Community
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="block h-10 w-px bg-cream/40" />
        </motion.div>
      </section>

      {/* Pluck story — editorial split */}
      <section className="relative py-24 lg:py-32">
        <div className="container-premium">
          <ScrollReveal>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <div>
                <p className="section-eyebrow">Our philosophy</p>
                <h2 className="heading-section text-balance">
                  A great directory starts with a careful{' '}
                  <span className="italic text-gold">connection.</span>
                </h2>
                <p className="mt-6 text-charcoal/75 leading-relaxed">
                  Like the top two leaves and a bud, we surface only what matters — names,
                  stories, and places where tea people gather. Quality, without pretense.
                </p>
                <Link to="/users" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-forest hover:text-gold transition-colors">
                  Meet the community <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lift"
              >
                <img
                  src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1200&auto=format&fit=crop"
                  alt="Tea leaves"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/40 to-transparent" />
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured users — best sellers style grid */}
      <section className="bg-white/40 py-24 backdrop-blur-sm lg:py-32">
        <div className="container-premium">
          <ScrollReveal className="mb-14 text-center">
            <p className="section-eyebrow">Featured members</p>
            <h2 className="heading-section">Loved by tea people everywhere.</h2>
            <p className="mx-auto mt-4 max-w-lg text-charcoal/70">
              Here&apos;s what our community looks like — real profiles, beautifully presented.
            </p>
          </ScrollReveal>

          {loadingFeatured ? (
            <div className="flex min-h-[280px] items-center justify-center py-12">
              <LoadingSpinner size="lg" label="Loading featured members…" />
            </div>
          ) : errorFeatured ? (
            <ErrorState message={errorFeatured} onRetry={loadFeatured} />
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {featured.map((user, i) => (
                <motion.div key={user.id} variants={staggerItem}>
                  <UserCard user={user} index={i} />
                </motion.div>
              ))}
            </motion.div>
          )}

          <ScrollReveal className="mt-14 text-center">
            <MagneticButton onClick={() => navigate('/users')}>View Full Directory</MagneticButton>
          </ScrollReveal>
        </div>
      </section>

      {/* Reviews carousel-style cards */}
      <section className="py-24 lg:py-32">
        <div className="container-premium">
          <ScrollReveal className="mb-12 text-center">
            <h2 className="heading-section">Stories steeped in warmth</h2>
          </ScrollReveal>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-3"
          >
            {[
              { quote: 'The right amount of connection.', author: 'Angelina R.', role: 'Community Member' },
              { quote: 'Incredibly refreshing to browse — light, crisp, and instantly inviting.', author: 'Jacob K.', role: 'Tea Enthusiast' },
              { quote: 'One visit and you feel the difference — clean design, rich experience.', author: 'Harrison G.', role: 'Directory Explorer' },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ y: -8 }}
                className="glass-panel p-8"
              >
                <Quote className="mb-4 h-8 w-8 text-gold/60" />
                <p className="font-display text-xl italic text-forest">&ldquo;{item.quote}&rdquo;</p>
                <p className="mt-6 text-sm font-medium text-charcoal">{item.author}</p>
                <p className="text-xs text-charcoal/50">{item.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Born in Colorado — origins CTA */}
      <section className="relative overflow-hidden bg-forest py-24 text-cream lg:py-32">
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay" />
        <div className="container-premium relative">
          <ScrollReveal className="max-w-2xl">
            <p className="section-eyebrow text-gold">Our origins</p>
            <h2 className="font-display text-4xl lowercase sm:text-5xl">born in the pacific northwest</h2>
            <p className="mt-6 text-cream/80 leading-relaxed">
              TeaSphere began in pursuit of a truly great experience — connecting people
              with the same care and curiosity that guides premium tea brands worldwide.
            </p>
            <div className="mt-10 flex flex-wrap gap-8">
              {[
                { n: '10', label: 'K+ Members' },
                { n: '50', label: 'Cities' },
                { n: '99', label: '% Uptime' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-4xl text-gold">{stat.n}</p>
                  <p className="text-xs uppercase tracking-widest text-cream/60">{stat.label}</p>
                </div>
              ))}
            </div>
            <MagneticButton variant="gold" className="mt-10" onClick={() => navigate('/about')}>
              Read Our Story
            </MagneticButton>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 text-center lg:py-32">
        <ScrollReveal className="container-premium">
          <h2 className="heading-section">Great tea. In good company.</h2>
          <p className="mx-auto mt-4 max-w-md text-charcoal/70">
            Discover the people and purpose behind every profile.
          </p>
          <MagneticButton variant="outline" className="mt-8" onClick={() => navigate('/contact')}>
            Get in Touch
          </MagneticButton>
        </ScrollReveal>
      </section>
    </main>
  )
}

export default Home
