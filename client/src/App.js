import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './scenes/home/Home'
import ItemDetails from './scenes/ItemDetails/ItemDetails'
import Confirmation from './scenes/checkout/Confirmation'
import Checkout from './scenes/checkout/Checkout'
import Navbar from './scenes/global/Navbar'
import CartMenu from './scenes/global/Cartmenu'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

console.log(process.env.REACT_APP_BASE_URL)

const App = () => {
  return (
    <div className='app'>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='item/:itemId' element={<ItemDetails />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='checkout/success' element={<Confirmation />} />
        </Routes>
        <CartMenu />
      </BrowserRouter>
    </div>
  )
}

export default App
