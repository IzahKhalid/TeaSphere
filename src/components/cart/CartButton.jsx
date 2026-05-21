import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext'

const CartButton = ({ light = false }) => {
  const { itemCount, openCart } = useCart()

  return (
    <motion.button
      type="button"
      onClick={openCart}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative rounded-full p-2.5 transition-colors ${
        light
          ? 'text-cream hover:bg-cream/10'
          : 'text-forest hover:bg-forest/5'
      }`}
      aria-label={`Open cart, ${itemCount} items`}
    >
      <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
      {itemCount > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-forest"
        >
          {itemCount > 99 ? '99+' : itemCount}
        </motion.span>
      )}
    </motion.button>
  )
}

export default CartButton
