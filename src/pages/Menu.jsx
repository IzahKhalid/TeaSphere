import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { MENU_CATEGORIES, MENU_PRODUCTS } from '../data/menuProducts'
import MenuProductCard from '../components/menu/MenuProductCard'
import ScrollReveal from '../components/ScrollReveal'

const Menu = () => {
  const [category, setCategory] = useState('all')

  const filtered = useMemo(() => {
    if (category === 'all') return MENU_PRODUCTS
    return MENU_PRODUCTS.filter((p) => p.category === category)
  }, [category])

  const teaCount = MENU_PRODUCTS.filter((p) => p.category !== 'snacks').length
  const snackCount = MENU_PRODUCTS.filter((p) => p.category === 'snacks').length

  return (
    <main>
      <section className="relative overflow-hidden border-b border-sand/40 bg-gradient-to-b from-forest/8 to-transparent pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="container-premium text-center">
          <ScrollReveal>
            <p className="section-eyebrow">Tea & Snacks</p>
            <h1 className="heading-display text-balance">
              A cup that fits the <span className="italic text-gold">moment.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-charcoal/70">
              Organic whole leaf teas, ceremonial matcha, and artisan snacks — curated for
              slow afternoons and shared tables.
            </p>
            <p className="mt-4 text-sm text-charcoal/50">
              {teaCount} teas · {snackCount} snacks
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="sticky top-[4.5rem] z-40 border-b border-sand/40 bg-cream/90 py-4 backdrop-blur-xl lg:top-[5rem]">
        <div className="container-premium">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {MENU_CATEGORIES.map((cat) => (
              <motion.button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all sm:px-5 ${
                  category === cat.id
                    ? 'bg-forest text-cream shadow-glass'
                    : 'bg-white/70 text-forest/80 ring-1 ring-sand/60 hover:bg-white hover:text-forest'
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-premium">
          <motion.div
            key={category}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((product, i) => (
              <MenuProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <p className="py-20 text-center text-charcoal/60">No items in this category.</p>
          )}
        </div>
      </section>
    </main>
  )
}

export default Menu
