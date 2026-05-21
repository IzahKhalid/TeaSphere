import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { getProductById } from '../data/menuProducts'

const STORAGE_KEY = 'teasphere-cart'

const CartContext = createContext(null)

const loadCart = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(loadCart)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = useCallback((productId, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId)
      if (existing) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i
        )
      }
      return [...prev, { productId, quantity }]
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((productId) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId))
  }, [])

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) {
      removeItem(productId)
      return
    }
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    )
  }, [removeItem])

  const clearCart = useCallback(() => setItems([]), [])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const cartLines = useMemo(
    () =>
      items
        .map((item) => {
          const product = getProductById(item.productId)
          if (!product) return null
          return { ...item, product, lineTotal: product.price * item.quantity }
        })
        .filter(Boolean),
    [items]
  )

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  )

  const subtotal = useMemo(
    () => cartLines.reduce((sum, line) => sum + line.lineTotal, 0),
    [cartLines]
  )

  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 5.95
  const total = subtotal + shipping

  const value = {
    items,
    cartLines,
    itemCount,
    subtotal,
    shipping,
    total,
    isOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
