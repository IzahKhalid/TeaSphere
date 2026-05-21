import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../data/menuProducts'
import ProductImage from '../menu/ProductImage'

const CartDrawer = () => {
  const navigate = useNavigate()
  const {
    isOpen,
    closeCart,
    cartLines,
    itemCount,
    subtotal,
    shipping,
    total,
    updateQuantity,
    removeItem,
  } = useCart()

  const goCheckout = () => {
    closeCart()
    navigate('/checkout')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[70] bg-charcoal/40 backdrop-blur-sm"
            aria-hidden
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            className="fixed bottom-0 right-0 top-0 z-[80] flex w-full max-w-md flex-col border-l border-sand/50 bg-cream shadow-lift"
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-sand/50 px-6 py-5">
              <div>
                <h2 className="font-display text-2xl text-forest">My Cart</h2>
                <p className="text-xs text-charcoal/50">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </p>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="rounded-lg p-2 text-forest hover:bg-forest/5"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cartLines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                  <ShoppingBag className="mb-4 h-14 w-14 text-sand" strokeWidth={1} />
                  <p className="font-display text-xl text-forest">Your cart is empty</p>
                  <p className="mt-2 text-sm text-charcoal/60">
                    Steep something wonderful from our menu.
                  </p>
                  <Link
                    to="/menu"
                    onClick={closeCart}
                    className="btn-primary mt-8 inline-flex"
                  >
                    Browse Menu
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  {cartLines.map(({ productId, product, quantity, lineTotal }) => (
                    <motion.li
                      key={productId}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 rounded-xl border border-sand/40 bg-white/60 p-3"
                    >
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                        <ProductImage
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="truncate font-medium text-forest">{product.name}</h3>
                          <button
                            type="button"
                            onClick={() => removeItem(productId)}
                            className="shrink-0 text-charcoal/40 hover:text-gold"
                            aria-label={`Remove ${product.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm text-gold">{formatPrice(product.price)}</p>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2 rounded-full border border-sand/60 bg-cream px-1">
                            <button
                              type="button"
                              onClick={() => updateQuantity(productId, quantity - 1)}
                              className="rounded-full p-1 hover:bg-forest/5"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-6 text-center text-sm font-medium">{quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(productId, quantity + 1)}
                              className="rounded-full p-1 hover:bg-forest/5"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-forest">
                            {formatPrice(lineTotal)}
                          </span>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {cartLines.length > 0 && (
              <div className="border-t border-sand/50 bg-white/50 px-6 py-6">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-charcoal/70">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-charcoal/70">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                  </div>
                  {subtotal < 50 && subtotal > 0 && (
                    <p className="text-xs text-sage">
                      Add {formatPrice(50 - subtotal)} more for free shipping
                    </p>
                  )}
                  <div className="flex justify-between border-t border-sand/50 pt-3 font-display text-lg text-forest">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
                <button type="button" onClick={goCheckout} className="btn-primary mt-5 w-full">
                  Checkout
                </button>
                <Link
                  to="/menu"
                  onClick={closeCart}
                  className="mt-3 block text-center text-xs font-medium uppercase tracking-widest text-forest/60 hover:text-gold"
                >
                  Continue shopping
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartDrawer
