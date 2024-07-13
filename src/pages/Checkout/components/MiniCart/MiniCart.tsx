import { useContext } from 'react'
import { ItemsContext } from '../../../../contexts/ItemsContext'
import { MiniCartContainer } from './styles'

export function MiniCart() {
  const { itemsAlreadyOnCart } = useContext(ItemsContext)

  const itemsInCart = itemsAlreadyOnCart()
  const total = itemsInCart.reduce(
    (acc, item) => acc + item.qty * item.price,
    0,
  )
  return (
    <MiniCartContainer>
      <h2>Items in Cart</h2>
      {itemsInCart.length > 0 ? (
        <ul>
          {itemsInCart.map((item) => (
            <li key={item.id}>
              {item.title} - Quantity: {item.qty} - Price:{' '}
              {(item.qty * item.price).toFixed(2)}
            </li>
          ))}
          <li>Total: {total.toFixed(2)}</li>
        </ul>
      ) : (
        <p>No items in cart</p>
      )}
    </MiniCartContainer>
  )
}
