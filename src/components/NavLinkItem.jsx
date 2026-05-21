import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { isNavActive } from '../utils/navActive'

/**
 * Nav link with consistent active styling (underline, pill, aria-current).
 */
const NavLinkItem = ({
  to,
  label,
  pathname,
  variant = 'desktop', // 'desktop' | 'mobile' | 'footer'
  onHero = false,
  scrolled = true,
  onClick,
}) => {
  const active = isNavActive(pathname, to)

  if (variant === 'footer') {
    return (
      <Link
        to={to}
        aria-current={active ? 'page' : undefined}
        className={`group inline-flex items-center gap-2 transition-colors ${
          active ? 'font-medium text-gold' : 'text-cream/80 hover:text-gold'
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full transition-all ${
            active ? 'scale-100 bg-gold' : 'scale-0 bg-gold group-hover:scale-75 group-hover:bg-gold/50'
          }`}
          aria-hidden
        />
        {label}
      </Link>
    )
  }

  if (variant === 'mobile') {
    return (
      <Link
        to={to}
        onClick={onClick}
        aria-current={active ? 'page' : undefined}
        className={`relative inline-block font-display text-2xl transition-colors ${
          active ? 'text-gold' : 'text-forest hover:text-gold'
        }`}
      >
        {label}
        {active && (
          <motion.span
            layoutId="mobile-nav-active"
            className="absolute -left-4 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-gold"
          />
        )}
      </Link>
    )
  }

  const lightNav = onHero && !scrolled

  return (
    <Link
      to={to}
      aria-current={active ? 'page' : undefined}
      className={`relative rounded-full px-3 py-1.5 text-sm font-medium tracking-wide transition-all duration-300 ${
        active
          ? lightNav
            ? 'bg-cream/15 text-gold shadow-sm ring-1 ring-gold/40'
            : 'bg-forest/8 text-gold shadow-sm ring-1 ring-gold/30'
          : lightNav
            ? 'text-cream/90 hover:bg-cream/10 hover:text-cream'
            : 'text-forest/75 hover:bg-forest/5 hover:text-forest'
      }`}
    >
      {label}
      {active && (
        <motion.span
          layoutId="nav-underline"
          className="absolute -bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-gold"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  )
}

export default NavLinkItem
