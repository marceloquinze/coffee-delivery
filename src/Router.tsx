import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { Checkout } from './pages/Checkout/Checkout'
import { Success } from './pages/Success/Success'
import { User } from './pages/User/User'
import { DefaultLayout } from './layouts/DefaultLayout'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/user" element={<User />} />
      </Route>
    </Routes>
  )
}
