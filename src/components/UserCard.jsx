import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Mail, MapPin, ArrowUpRight } from 'lucide-react'

const UserCard = ({ user, index = 0 }) => {
  const navigate = useNavigate()
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -12, scale: 1.02 }}
      onClick={() => navigate(`/user/${user.id}`)}
      className="group glass-panel cursor-pointer overflow-hidden p-6 transition-shadow hover:shadow-lift"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/user/${user.id}`)}
    >
      <motion.div
        className="relative mx-auto mb-5 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-gold via-sand to-sage font-display text-2xl font-semibold text-white shadow-glow"
        whileHover={{ scale: 1.08, rotate: 3 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {initials}
      </motion.div>

      <h3 className="text-center font-display text-xl text-forest">{user.name}</h3>
      <p className="mb-4 text-center text-sm text-gold">@{user.username}</p>

      <div className="space-y-2 text-sm text-charcoal/70">
        <div className="flex items-center justify-center gap-2">
          <Mail className="h-3.5 w-3.5 shrink-0 text-sage" />
          <span className="truncate">{user.email}</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-sage" />
          <span>{user.address?.city}</span>
        </div>
      </div>

      <p className="mt-5 flex items-center justify-center gap-1 text-xs font-semibold uppercase tracking-widest text-forest opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        View profile
        <ArrowUpRight className="h-3.5 w-3.5" />
      </p>
    </motion.article>
  )
}

export default UserCard
