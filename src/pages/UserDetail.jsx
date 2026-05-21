import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Building2,
  Globe,
  User,
  Briefcase,
} from 'lucide-react'
import { useUserDetail } from '../hooks/useUsers'
import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'
import MagneticButton from '../components/MagneticButton'
import ScrollReveal from '../components/ScrollReveal'
import { staggerContainer, staggerItem } from '../animations/variants'

const InfoRow = ({ icon: Icon, label, value }) => (
  <motion.div
    variants={staggerItem}
    whileHover={{ x: 6 }}
    className="flex gap-4 rounded-xl border border-sand/40 bg-white/50 p-5 transition-shadow hover:shadow-glass"
  >
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest/5">
      <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
    </div>
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-widest text-sage">{label}</p>
      <p className="mt-1 break-words text-charcoal">{value || '—'}</p>
    </div>
  </motion.div>
)

const UserDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, loading, error, retry } = useUserDetail(id)

  if (loading) {
    return <LoadingState label="Loading profile…" minHeight="min-h-[60vh]" />
  }

  if (error) {
    return (
      <div className="container-premium pb-24 pt-28">
        <ErrorState message={error} onRetry={retry} />
        <div className="mt-8 text-center">
          <MagneticButton variant="outline" onClick={() => navigate('/users')}>
            Back to Community
          </MagneticButton>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container-premium py-32 text-center">
        <p className="font-display text-2xl">Member not found</p>
        <MagneticButton className="mt-6" onClick={() => navigate('/users')}>
          Return to directory
        </MagneticButton>
      </div>
    )
  }

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)

  const address = `${user.address?.suite}, ${user.address?.street}, ${user.address?.city}, ${user.address?.zipcode}`

  return (
    <div className="pb-24 pt-24 lg:pt-28">
      <div className="container-premium">
        <motion.button
          type="button"
          onClick={() => navigate(-1)}
          whileHover={{ x: -4 }}
          className="mb-10 flex items-center gap-2 text-sm font-medium text-gold transition-colors hover:text-forest"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Community
        </motion.button>

        <ScrollReveal>
          <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel overflow-hidden"
          >
            {/* Profile header */}
            <div className="relative bg-gradient-to-br from-forest via-forest/90 to-sage/80 px-8 py-16 text-center text-cream sm:px-12">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-gold to-sand font-display text-4xl font-semibold text-white shadow-glow"
              >
                {initials}
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-display text-4xl sm:text-5xl"
              >
                {user.name}
              </motion.h1>
              <p className="mt-2 text-gold">@{user.username}</p>
            </div>

            {/* Info grid */}
            <div className="p-8 sm:p-12">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid gap-4 sm:grid-cols-2"
              >
                <InfoRow icon={Mail} label="Email" value={user.email} />
                <InfoRow icon={Phone} label="Phone" value={user.phone} />
                <InfoRow icon={MapPin} label="Address" value={address} />
                <InfoRow icon={Building2} label="Company" value={user.company?.name} />
                <InfoRow icon={Briefcase} label="Catchphrase" value={user.company?.catchPhrase} />
                <InfoRow icon={Globe} label="Website" value={user.website} />
                <InfoRow icon={User} label="Username" value={user.username} />
              </motion.div>

              {user.company?.bs && (
                <motion.blockquote
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-10 border-l-2 border-gold pl-6 font-display text-xl italic text-forest/80"
                >
                  &ldquo;{user.company.bs}&rdquo;
                </motion.blockquote>
              )}
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </div>
  )
}

export default UserDetail
