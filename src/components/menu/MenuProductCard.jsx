import { motion } from 'framer-motion'
import { Plus, Leaf } from 'lucide-react'
import { formatPrice } from '../../data/menuProducts'
import { useCart } from '../../context/CartContext'
import ProductImage from './ProductImage'

const MenuProductCard = ({ product, index = 0 }) => {
  const { addItem } = useCart()

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group glass-panel flex flex-col overflow-hidden"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-sand/30">
        <ProductImage
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-forest px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-cream">
            {product.tag}
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-forest/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-display text-xl text-forest">{product.name}</h3>
          <span className="shrink-0 font-medium text-gold">{formatPrice(product.price)}</span>
        </div>

        <p className="mb-4 flex-1 text-sm leading-relaxed text-charcoal/65">
          {product.description}
        </p>

        <div className="mb-4 flex items-center gap-2 text-xs text-charcoal/50">
          <Leaf className="h-3.5 w-3.5 text-sage" />
          <span>{product.caffeine} caffeine</span>
        </div>

        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => addItem(product.id)}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-forest py-3 text-sm font-medium text-cream transition-colors hover:bg-charcoal"
        >
          <Plus className="h-4 w-4" />
          Add to Cart
        </motion.button>
      </div>
    </motion.article>
  )
}

export default MenuProductCard
