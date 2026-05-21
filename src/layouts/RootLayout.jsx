import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CursorGlow from '../components/CursorGlow'
import BackgroundAmbience from '../components/BackgroundAmbience'
import PageTransition from '../components/PageTransition'
import CartDrawer from '../components/cart/CartDrawer'
import PageLoader from '../components/PageLoader'

const RootLayout = () => {
  const location = useLocation()

  return (
    <>
      <BackgroundAmbience />
      <CursorGlow />
      <Navbar />
      <PageLoader />
      <CartDrawer />
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Outlet />
        </PageTransition>
      </AnimatePresence>
      <Footer />
    </>
  )
}

export default RootLayout
