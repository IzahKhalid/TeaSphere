import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, CheckCircle, AlertCircle, Send } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import MagneticButton from '../components/MagneticButton'
import LoadingSpinner from '../components/LoadingSpinner'
import { staggerContainer, staggerItem } from '../animations/variants'

const FloatingField = ({ id, label, type = 'text', value, onChange, as = 'input' }) => (
  <div className="floating-label-group">
    {as === 'textarea' ? (
      <textarea
        id={id}
        placeholder=" "
        rows={5}
        value={value}
        onChange={onChange}
        className="floating-label-input resize-none"
      />
    ) : (
      <input
        id={id}
        type={type}
        placeholder=" "
        value={value}
        onChange={onChange}
        className="floating-label-input"
      />
    )}
    <label htmlFor={id} className="floating-label">
      {label}
    </label>
  </div>
)

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // 'success' | 'error' | null
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    if (status) setStatus(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error')
      return
    }
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitting(false)
    setStatus('success')
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setStatus(null), 5000)
  }

  return (
    <main>
      <section className="relative flex min-h-[40vh] items-center justify-center bg-forest text-cream">
        <div className="absolute inset-0 bg-soft-radial opacity-60" />
        <div className="container-premium relative py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-display text-cream"
          >
            Let&apos;s connect
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mx-auto mt-4 max-w-md text-cream/75"
          >
            Reach out to our tea sommeliers — we&apos;d love to hear from you.
          </motion.p>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="container-premium">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <ScrollReveal>
              <motion.form
                onSubmit={handleSubmit}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="glass-panel space-y-6 p-8 sm:p-10"
              >
                <motion.div variants={staggerItem}>
                  <FloatingField
                    id="name"
                    label="Your name"
                    value={form.name}
                    onChange={handleChange('name')}
                  />
                </motion.div>
                <motion.div variants={staggerItem}>
                  <FloatingField
                    id="email"
                    label="Email address"
                    type="email"
                    value={form.email}
                    onChange={handleChange('email')}
                  />
                </motion.div>
                <motion.div variants={staggerItem}>
                  <FloatingField
                    id="message"
                    label="Your message"
                    as="textarea"
                    value={form.message}
                    onChange={handleChange('message')}
                  />
                </motion.div>

                <motion.div variants={staggerItem}>
                  <MagneticButton type="submit" className="w-full sm:w-auto" disabled={submitting}>
                    {submitting ? (
                      <>
                        <LoadingSpinner size="sm" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" /> Send Message
                      </>
                    )}
                  </MagneticButton>
                </motion.div>

                <AnimatePresence mode="wait">
                  {status === 'success' && (
                    <motion.div
                      key="ok"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 rounded-xl bg-sage/20 px-4 py-3 text-sm text-forest"
                    >
                      <CheckCircle className="h-5 w-5 text-forest" />
                      Thank you! We&apos;ll steep your message and be in touch soon.
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div
                      key="err"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 rounded-xl bg-gold/20 px-4 py-3 text-sm text-charcoal"
                    >
                      <AlertCircle className="h-5 w-5" />
                      Please fill in all fields before sending.
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="lg:pt-8">
                <p className="section-eyebrow">Visit us</p>
                <h2 className="heading-section mb-6 text-3xl">Great tea. In good company.</h2>
                <p className="mb-10 leading-relaxed text-charcoal/70">
                  Questions about the directory, partnerships, or our design philosophy? Our team
                  responds within one business day.
                </p>
                <ul className="space-y-6">
                  {[
                    { icon: Mail, text: 'hello@teasphere.com' },
                    { icon: Phone, text: '+1 (555) 123-4567' },
                    { icon: MapPin, text: '123 Tea Lane, Portland, OR 97201' },
                  ].map(({ icon: Icon, text }) => (
                    <motion.li
                      key={text}
                      whileHover={{ x: 8 }}
                      className="flex items-center gap-4 text-charcoal/80"
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest/5">
                        <Icon className="h-5 w-5 text-gold" />
                      </span>
                      {text}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contact
