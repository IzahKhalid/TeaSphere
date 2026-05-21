/** Tea menu & snack products for TeaSphere */

/** Fallback when an image fails to load (verified 200 on Unsplash) */
export const MENU_IMAGE_FALLBACK =
  'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&h=600&fit=crop&auto=format&q=80'

const img = (id) =>
  `https://images.unsplash.com/${id}?w=800&h=600&fit=crop&auto=format&q=80`

export const MENU_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'green', label: 'Green Tea' },
  { id: 'black', label: 'Black Tea' },
  { id: 'herbal', label: 'Herbal' },
  { id: 'matcha', label: 'Matcha' },
  { id: 'snacks', label: 'Snacks' },
]

export const MENU_PRODUCTS = [
  {
    id: 'organic-tropical-green',
    name: 'Organic Tropical Green',
    category: 'green',
    description: 'A fruity, fun take on classic green tea with bright tropical notes.',
    price: 11.95,
    image: img('photo-1556679343-c7306c1976bc'),
    caffeine: 'Light',
    tag: 'Best Seller',
  },
  {
    id: 'jasmine-petal',
    name: 'Jasmine Petal Green',
    category: 'green',
    description: 'Delicate jasmine blossoms layered over smooth organic green tea.',
    price: 12.5,
    image: img('photo-1564890369478-c89ca6d9cde9'),
    caffeine: 'Light',
  },
  {
    id: 'organic-earl-grey',
    name: 'Organic Earl Grey',
    category: 'black',
    description: 'Bergamot-kissed black tea with a distinctive citrus aroma.',
    price: 11.95,
    image: img('photo-1571934811356-5cc061b6821f'),
    caffeine: 'Moderate',
    tag: 'Classic',
  },
  {
    id: 'mountain-high-chai',
    name: 'Mountain High Chai',
    category: 'black',
    description: 'Rocky Mountain roots meet spice-filled black tea and warm aromatics.',
    price: 11.95,
    image: img('photo-1544787219-7f47ccb76574'),
    caffeine: 'Moderate',
    tag: 'Spiced',
  },
  {
    id: 'organic-peppermint',
    name: 'Organic Peppermint',
    category: 'herbal',
    description: 'Cooling Washington-grown peppermint — caffeine-free and soothing.',
    price: 10.95,
    image: img('photo-1576091160399-112ba8d25d1d'),
    caffeine: 'None',
  },
  {
    id: 'alpine-berry',
    name: 'Alpine Berry Herbal',
    category: 'herbal',
    description: 'Naturally sweet, tart, caffeine-free blend of mountain berries.',
    price: 8.95,
    image: img('photo-1578662996442-48f60103fc96'),
    caffeine: 'None',
  },
  {
    id: 'ceremonial-matcha',
    name: 'Ceremonial Matcha',
    category: 'matcha',
    description: 'Stone-ground Japanese matcha for whisked bowls and mindful rituals.',
    price: 24.95,
    image: img('photo-1514432324607-a09d9b4aefdd'),
    caffeine: 'Moderate',
    tag: 'Premium',
  },
  {
    id: 'nice-matcha-latte',
    name: 'Nice Matcha Latte Mix',
    category: 'matcha',
    description: 'Lightly sweetened matcha blend for effortless café-style lattes.',
    price: 12.95,
    image: img('photo-1495474472287-4d71bcdd2085'),
    caffeine: 'Moderate',
  },
  {
    id: 'shortbread-biscuits',
    name: 'Tea Shortbread Biscuits',
    category: 'snacks',
    description: 'Buttery, crumbly shortbread — the perfect afternoon tea companion.',
    price: 7.5,
    image: img('photo-1551024506-0bccd828d307'),
    caffeine: 'None',
  },
  {
    id: 'matcha-energy-balls',
    name: 'Matcha Energy Balls',
    category: 'snacks',
    description: 'Dates, almonds, and matcha rolled into bite-sized natural energy.',
    price: 9.95,
    image: img('photo-1606313564200-e75d5e30476c'),
    caffeine: 'Light',
  },
  {
    id: 'lavender-honey-scones',
    name: 'Lavender Honey Scones',
    category: 'snacks',
    description: 'Floral lavender and wildflower honey in a tender baked scone.',
    price: 8.95,
    image: img('photo-1555507036-ab1f4038808a'),
    caffeine: 'None',
    tag: 'Bakery',
  },
  {
    id: 'dark-chocolate-truffles',
    name: 'Dark Chocolate Truffles',
    category: 'snacks',
    description: 'Rich cacao truffles that melt beside any evening cup.',
    price: 11.5,
    image: img('photo-1563805042-7684c019e1cb'),
    caffeine: 'Light',
  },
]

export const getProductById = (id) => MENU_PRODUCTS.find((p) => p.id === id)

export const formatPrice = (amount) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
