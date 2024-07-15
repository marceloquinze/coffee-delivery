import { NavLink } from 'react-router-dom'
import siteLogo from '../../assets/Logo.svg'
import { HeaderContainer } from './styles'
import { MapPin, ShoppingCart } from 'phosphor-react'
import { useContext } from 'react'
import { ItemsContext } from '../../contexts/ItemsContext'

export function Header() {
  const { itemsInCart } = useContext(ItemsContext)
  const totalItems = itemsInCart.reduce((acc, item) => acc + item.qty, 0)
  return (
    <HeaderContainer>
      <nav>
        <NavLink to="/">
          <img src={siteLogo} alt="" />
        </NavLink>
      </nav>
      <div className="user-items">
        <nav>
          <NavLink to="/checkout" className="location">
            <MapPin size={24} weight="fill" />
            Porto Alegre, RS
          </NavLink>
          <NavLink to="/checkout" className="cart">
            <ShoppingCart size={24} weight="fill" />
            {totalItems !== 0 && <span>{totalItems}</span>}
          </NavLink>
        </nav>
      </div>
    </HeaderContainer>
  )
}
