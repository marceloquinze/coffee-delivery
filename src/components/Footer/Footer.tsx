import { NavLink } from 'react-router-dom'
import { FooterContainer } from './styles'
import { ShoppingCart, User } from 'phosphor-react'

export function Footer() {
  return (
    <FooterContainer className="footer-container">
      <div className="wrapper">
        <p>© {new Date().getFullYear()} Coffee Delivery</p>
        <div className="user-items">
          <nav>
            <NavLink to="/user" className="location">
              <User size={24} weight="fill" />
            </NavLink>
            <NavLink to="/checkout" className="cart">
              <ShoppingCart size={24} weight="fill" />
            </NavLink>
          </nav>
        </div>
      </div>
    </FooterContainer>
  )
}
