import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/menuProducts'
import MagneticButton from '../components/MagneticButton'
import LoadingSpinner from '../components/LoadingSpinner'
import ProductImage from '../components/menu/ProductImage'
import ScrollReveal from '../components/ScrollReveal'

const Checkout = () => {
  const navigate = useNavigate()
  const { cartLines, subtotal, shipping, total, clearCart, itemCount } = useCart()
  const [status, setStatus] = useState('form') // form | success
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    card: '',
  })

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const required = ['firstName', 'lastName', 'email', 'address', 'city', 'zip']
    if (required.some((k) => !form[k].trim())) return

    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1400))
    clearCart()
    setSubmitting(false)
    setStatus('success')
  }

  if (itemCount === 0 && status === 'form') {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-5 pt-28 pb-20 text-center">
        <ShoppingBag className="mb-6 h-16 w-16 text-sand" />
        <h1 className="heading-section">Nothing to checkout</h1>
        <p className="mt-3 text-charcoal/60">Your cart is empty. Add teas or snacks first.</p>
        <MagneticButton className="mt-8" onClick={() => navigate('/menu')}>
          Browse Menu
        </MagneticButton>
      </main>
    )
  }

  if (status === 'success') {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-5 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel max-w-lg p-10 text-center"
        >
          <CheckCircle className="mx-auto mb-6 h-16 w-16 text-sage" />
          <h1 className="heading-section text-3xl">Order placed!</h1>
          <p className="mt-4 text-charcoal/70">
            Thank you, {form.firstName}. Your tea is being prepared with care. A confirmation
            was sent to {form.email}.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <MagneticButton onClick={() => navigate('/menu')}>Continue Shopping</MagneticButton>
            <MagneticButton variant="outline" onClick={() => navigate('/')}>
              Back Home
            </MagneticButton>
          </div>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="pb-24 pt-28 lg:pt-32">
      <div className="container-premium">
        <button
          type="button"
          onClick={() => navigate('/menu')}
          className="mb-8 flex items-center gap-2 text-sm font-medium text-gold hover:text-forest"
        >
          <ArrowLeft className="h-4 w-4" /> Back to menu
        </button>

        <ScrollReveal>
          <h1 className="heading-display mb-2 text-4xl sm:text-5xl">Checkout</h1>
          <p className="mb-12 text-charcoal/65">Complete your order — demo checkout, no real charges.</p>
        </ScrollReveal>

        <div className="grid gap-12 lg:grid-cols-5">
          <form onSubmit={handleSubmit} className="lg:col-span-3">
            <div className="glass-panel space-y-5 p-6 sm:p-8">
              <h2 className="font-display text-xl text-forest">Shipping details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  required
                  placeholder="First name"
                  value={form.firstName}
                  onChange={handleChange('firstName')}
                  className="rounded-xl border border-sand/80 bg-white/80 px-4 py-3 outline-none focus:border-forest focus:ring-2 focus:ring-forest/10"
                />
                <input
                  required
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={handleChange('lastName')}
                  className="rounded-xl border border-sand/80 bg-white/80 px-4 py-3 outline-none focus:border-forest focus:ring-2 focus:ring-forest/10"
                />
              </div>
              <input
                required
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange('email')}
                className="w-full rounded-xl border border-sand/80 bg-white/80 px-4 py-3 outline-none focus:border-forest focus:ring-2 focus:ring-forest/10"
              />
              <input
                required
                placeholder="Street address"
                value={form.address}
                onChange={handleChange('address')}
                className="w-full rounded-xl border border-sand/80 bg-white/80 px-4 py-3 outline-none focus:border-forest focus:ring-2 focus:ring-forest/10"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  required
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange('city')}
                  className="rounded-xl border border-sand/80 bg-white/80 px-4 py-3 outline-none focus:border-forest focus:ring-2 focus:ring-forest/10"
                />
                <input
                  required
                  placeholder="ZIP code"
                  value={form.zip}
                  onChange={handleChange('zip')}
                  className="rounded-xl border border-sand/80 bg-white/80 px-4 py-3 outline-none focus:border-forest focus:ring-2 focus:ring-forest/10"
                />
              </div>

              <h2 className="pt-4 font-display text-xl text-forest">Payment (demo)</h2>
              <input
                placeholder="Card number (demo — any value)"
                value={form.card}
                onChange={handleChange('card')}
                className="w-full rounded-xl border border-sand/80 bg-white/80 px-4 py-3 outline-none focus:border-forest focus:ring-2 focus:ring-forest/10"
              />

              <MagneticButton type="submit" className="w-full sm:w-auto" disabled={submitting}>
                {submitting ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Processing…
                  </>
                ) : (
                  `Place Order — ${formatPrice(total)}`
                )}
              </MagneticButton>
            </div>
          </form>

          <aside className="lg:col-span-2">
            <div className="glass-panel sticky top-28 p-6 sm:p-8">
              <h2 className="mb-6 font-display text-xl text-forest">Order summary</h2>
              <ul className="max-h-64 space-y-4 overflow-y-auto">
                <AnimatePresence>
                  {cartLines.map(({ productId, product, quantity, lineTotal }) => (
                    <motion.li
                      key={productId}
                      layout
                      className="flex gap-3 border-b border-sand/30 pb-4 last:border-0"
                    >
                      <div className="h-14 w-14 overflow-hidden rounded-lg">
                        <ProductImage
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-forest">{product.name}</p>
                        <p className="text-xs text-charcoal/50">Qty {quantity}</p>
                      </div>
                      <span className="text-sm font-medium">{formatPrice(lineTotal)}</span>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
              <div className="mt-6 space-y-2 border-t border-sand/50 pt-4 text-sm">
                <div className="flex justify-between text-charcoal/70">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-charcoal/70">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between font-display text-lg text-forest">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              <Link
                to="/menu"
                className="mt-6 block text-center text-xs uppercase tracking-widest text-forest/50 hover:text-gold"
              >
                Edit cart
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default Checkout
