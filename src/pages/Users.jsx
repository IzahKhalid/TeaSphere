import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react'
import { useUsers } from '../hooks/useUsers'
import UserCard from '../components/UserCard'
import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'
import ScrollReveal from '../components/ScrollReveal'
import { staggerContainer } from '../animations/variants'

const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name A–Z' },
  { value: 'name-desc', label: 'Name Z–A' },
  { value: 'city-asc', label: 'City A–Z' },
]

const Users = () => {
  const { users, loading, error, retry } = useUsers()
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('name-asc')
  const [cityFilter, setCityFilter] = useState('all')

  const cities = useMemo(() => {
    const set = new Set(users.map((u) => u.address?.city).filter(Boolean))
    return ['all', ...Array.from(set).sort()]
  }, [users])

  const filtered = useMemo(() => {
    let list = [...users]

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.username.toLowerCase().includes(q)
      )
    }

    if (cityFilter !== 'all') {
      list = list.filter((u) => u.address?.city === cityFilter)
    }

    list.sort((a, b) => {
      if (sort === 'name-desc') return b.name.localeCompare(a.name)
      if (sort === 'city-asc') return (a.address?.city || '').localeCompare(b.address?.city || '')
      return a.name.localeCompare(b.name)
    })

    return list
  }, [users, search, sort, cityFilter])

  return (
    <div className="pb-24 pt-28 lg:pt-32">
      {/* Page hero */}
      <section className="relative overflow-hidden border-b border-sand/40 bg-gradient-to-b from-forest/5 to-transparent py-16 lg:py-24">
        <div className="container-premium text-center">
          <ScrollReveal>
            <p className="section-eyebrow">Community Directory</p>
            <h1 className="heading-display text-4xl sm:text-5xl lg:text-6xl">
              Tea <span className="italic text-gold">Community</span>
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-charcoal/70">
              Discover and connect with fellow enthusiasts — fetched live from our directory API.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="container-premium py-12 lg:py-16">
        {/* Search + filters */}
        <ScrollReveal>
          <motion.div
            layout
            className="glass-panel mb-10 flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sage" />
              <motion.input
                type="search"
                placeholder="Search by name, username, or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                whileFocus={{ scale: 1.01 }}
                className="w-full rounded-xl border border-sand/60 bg-white/80 py-3.5 pl-11 pr-4 text-sm outline-none transition-all focus:border-forest focus:ring-2 focus:ring-forest/10"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="relative flex items-center gap-2 rounded-xl border border-sand/60 bg-white/80 px-3 py-2">
                <SlidersHorizontal className="h-4 w-4 text-sage" />
                <select
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="bg-transparent text-sm outline-none"
                  aria-label="Filter by city"
                >
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c === 'all' ? 'All cities' : c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative flex items-center gap-2 rounded-xl border border-sand/60 bg-white/80 px-3 py-2">
                <ArrowUpDown className="h-4 w-4 text-sage" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="bg-transparent text-sm outline-none"
                  aria-label="Sort users"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>

        {loading && <LoadingState label="Loading community…" minHeight="min-h-[35vh]" />}

        {error && !loading && <ErrorState message={error} onRetry={retry} />}

        {!loading && !error && (
          <>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8 text-sm text-charcoal/60"
            >
              Showing {filtered.length} of {users.length} members
            </motion.p>

            {filtered.length > 0 ? (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filtered.map((user, i) => (
                  <UserCard key={user.id} user={user} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel py-20 text-center"
              >
                <p className="font-display text-2xl text-forest">No members found</p>
                <p className="mt-2 text-charcoal/60">Try adjusting your search or filters.</p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Users
