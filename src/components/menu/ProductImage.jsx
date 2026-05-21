import { useState } from 'react'
import { Leaf } from 'lucide-react'
import { MENU_IMAGE_FALLBACK } from '../../data/menuProducts'

/**
 * Menu product image — retries fallback URL, then shows placeholder.
 */
const ProductImage = ({ src, alt, className = '' }) => {
  const [currentSrc, setCurrentSrc] = useState(src)
  const [failed, setFailed] = useState(false)

  if (failed || !currentSrc) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-sand/50 to-sage/30 ${className}`}
        role="img"
        aria-label={alt}
      >
        <Leaf className="h-12 w-12 text-forest/25" strokeWidth={1} />
      </div>
    )
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      className={className}
      onError={() => {
        if (currentSrc !== MENU_IMAGE_FALLBACK) {
          setCurrentSrc(MENU_IMAGE_FALLBACK)
        } else {
          setFailed(true)
        }
      }}
    />
  )
}

export default ProductImage
