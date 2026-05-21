import FloatingBlob from './FloatingBlob'

/** Floating gradient blobs behind page content */
const BackgroundAmbience = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
    <FloatingBlob className="left-[-8%] top-[12%] h-72 w-72 bg-sage/40" delay={0} duration={14} />
    <FloatingBlob className="right-[-5%] top-[35%] h-96 w-96 bg-gold/25" delay={2} duration={18} />
    <FloatingBlob className="bottom-[8%] left-[20%] h-80 w-80 bg-forest/15" delay={1} duration={16} />
    <div className="absolute inset-0 bg-soft-radial opacity-80" />
  </div>
)

export default BackgroundAmbience
