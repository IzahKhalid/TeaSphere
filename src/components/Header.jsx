import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Leaf, Menu, X, ShoppingBag, User } from 'lucide-react'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/users', label: 'Community' },
    { path: '/about', label: 'Our Story' },
    { path: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(0,0,0,0.05)' : 'none',
          transition: 'all 0.4s ease',
          padding: '1rem 0'
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.6 }}
            >
              <Leaf size={32} color="var(--color-gold-muted)" />
            </motion.div>
            <span style={{ 
              fontSize: '1.5rem', 
              fontFamily: 'Playfair Display', 
              fontWeight: 600, 
              color: 'var(--color-forest-deep)',
              letterSpacing: '-0.5px'
            }}>
              TeaSphere
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} style={{ textDecoration: 'none' }}>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    color: location.pathname === link.path ? 'var(--color-gold-muted)' : 'var(--color-forest-deep)',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    letterSpacing: '0.5px',
                    position: 'relative',
                    cursor: 'pointer'
                  }}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="underline"
                      style={{
                        position: 'absolute',
                        bottom: -8,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: 'var(--color-gold-muted)'
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.span>
              </Link>
            ))}
            
            {/* Cart/User Icon */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{ cursor: 'pointer' }}
            >
              <User size={20} color="var(--color-forest-deep)" />
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer' }}
            className="mobile-menu-btn"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 20 }}
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: '280px',
            background: 'white',
            zIndex: 999,
            padding: '6rem 2rem',
            boxShadow: '-5px 0 30px rgba(0,0,0,0.1)'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ textDecoration: 'none', color: 'var(--color-forest-deep)', fontSize: '1.1rem' }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </>
  )
}

export default Header