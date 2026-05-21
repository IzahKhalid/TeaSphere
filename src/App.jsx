import { Routes, Route } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import Users from './pages/Users'
import UserDetail from './pages/UserDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Menu from './pages/Menu'
import Checkout from './pages/Checkout'

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App