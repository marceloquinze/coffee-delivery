import { NavLink } from 'react-router-dom'
import siteLogo from '../../assets/Logo.svg'
import { HeaderContainer } from './styles'
import { MapPin, ShoppingCart } from 'phosphor-react'
import { useContext } from 'react'
import { ItemsContext } from '../../contexts/ItemsContext'

export function Header() {
  const { itemsOnCart } = useContext(ItemsContext)
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
            {itemsOnCart !== 0 && <span>{itemsOnCart}</span>}
          </NavLink>
        </nav>
      </div>
    </HeaderContainer>
  )
}
