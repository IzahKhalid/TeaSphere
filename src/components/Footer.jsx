import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Leaf, Mail, Phone, MapPin } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import NavLinkItem from './NavLinkItem'

const FOOTER_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Tea Menu' },
  { to: '/users', label: 'Community' },
  { to: '/about', label: 'Our Story' },
  { to: '/contact', label: 'Contact' },
]

const Footer = () => {
  const { pathname } = useLocation()

  return (
  <footer className="relative mt-24 overflow-hidden bg-forest text-cream">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(196,155,102,0.15),transparent_50%)]" />
    <div className="container-premium relative py-16 lg:py-20">
      <ScrollReveal>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <Leaf className="h-6 w-6 text-gold" strokeWidth={1.5} />
              <span className="font-display text-2xl">TeaSphere</span>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-cream/75">
              A cup that fits the moment. TeaSphere User Directory connects tea-inspired
              community members with the care of a careful pluck — two leaves and a bud.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Navigate
            </h4>
            <ul className="space-y-3 text-sm">
              {FOOTER_LINKS.map((item) => (
                <li key={item.to}>
                  <NavLinkItem
                    to={item.to}
                    label={item.label}
                    pathname={pathname}
                    variant="footer"
                  />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Connect
            </h4>
            <ul className="space-y-3 text-sm text-cream/80">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold" /> hello@teasphere.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold" /> +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold" /> Portland, Oregon
              </li>
            </ul>
          </div>
        </div>
      </ScrollReveal>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-14 border-t border-cream/10 pt-8 text-center text-xs text-cream/50"
      >
        &copy; {new Date().getFullYear()} TeaSphere User Directory. Crafted with organic care.
      </motion.div>
    </div>
  </footer>
  )
}

export default Footer
