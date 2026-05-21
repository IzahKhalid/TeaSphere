import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Leaf, Menu as MenuIcon, X } from 'lucide-react'
import { navVariants } from '../animations/variants'
import NavLinkItem from './NavLinkItem'
import CartButton from './cart/CartButton'
import { isNavActive } from '../utils/navActive'

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/menu', label: 'Tea Menu' },
  { path: '/users', label: 'Community' },
  { path: '/about', label: 'Our Story' },
  { path: '/contact', label: 'Contact' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const onHero = pathname === '/' && !scrolled
  const directoryActive = isNavActive(pathname, '/users')
  const menuActive = isNavActive(pathname, '/menu')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <motion.header
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled || !onHero
            ? 'border-b border-forest/5 bg-cream/75 py-3 shadow-glass backdrop-blur-xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container-premium flex items-center justify-between">
          <Link
            to="/"
            aria-current={pathname === '/' ? 'page' : undefined}
            className={`group flex items-center gap-2.5 rounded-lg px-1 transition-opacity ${
              pathname === '/' ? 'opacity-100' : 'hover:opacity-90'
            }`}
          >
            <motion.span whileHover={{ rotate: 12, scale: 1.05 }} transition={{ type: 'spring' }}>
              <Leaf className="h-7 w-7 text-gold" strokeWidth={1.5} />
            </motion.span>
            <span
              className={`font-display text-xl tracking-tight transition-colors ${
                onHero && !scrolled ? 'text-cream' : 'text-forest'
              }`}
            >
              TeaSphere
            </span>
          </Link>

          <nav className="hidden items-center gap-2 md:flex" aria-label="Main">
            {NAV_LINKS.map((link) => (
              <NavLinkItem
                key={link.path}
                to={link.path}
                label={link.label}
                pathname={pathname}
                onHero={onHero}
                scrolled={scrolled}
              />
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <CartButton light={onHero && !scrolled} />
            <Link
              to="/menu"
              aria-current={menuActive ? 'page' : undefined}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                menuActive
                  ? 'bg-gold text-forest ring-2 ring-gold/50 shadow-glow'
                  : onHero && !scrolled
                    ? 'border border-cream/50 text-cream hover:bg-cream/10'
                    : 'bg-forest text-cream hover:bg-charcoal'
              }`}
            >
              Shop Tea
            </Link>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <CartButton light={onHero && !scrolled} />
          <button
            type="button"
            className={`rounded-lg p-2 md:hidden ${onHero && !scrolled ? 'text-cream' : 'text-forest'}`}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed inset-y-0 right-0 z-[60] w-[min(320px,85vw)] border-l border-sand/50 bg-cream/95 p-8 pt-24 shadow-lift backdrop-blur-2xl md:hidden"
          >
            <nav className="flex flex-col gap-6 pl-2" aria-label="Mobile">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <NavLinkItem
                    to={link.path}
                    label={link.label}
                    pathname={pathname}
                    variant="mobile"
                    onClick={() => setMobileOpen(false)}
                  />
                </motion.div>
              ))}
              <Link
                to="/menu"
                onClick={() => setMobileOpen(false)}
                className={`btn-primary mt-4 w-full text-center ${
                  menuActive ? 'ring-2 ring-gold ring-offset-2' : ''
                }`}
                aria-current={menuActive ? 'page' : undefined}
              >
                Shop Tea Menu
              </Link>
              <Link
                to="/users"
                onClick={() => setMobileOpen(false)}
                className={`btn-outline-tea mt-3 w-full text-center ${
                  directoryActive ? 'ring-2 ring-gold' : ''
                }`}
                aria-current={directoryActive ? 'page' : undefined}
              >
                Community Directory
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
