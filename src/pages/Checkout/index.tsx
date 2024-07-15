import { useContext } from 'react'
import { MiniCart } from './components/MiniCart/MiniCart'
import { CheckoutContainer, MiniCartContainer } from './styles'
import { ItemsContext } from '../../contexts/ItemsContext'

export function Checkout() {
  const { changeQuantity, decrementItems, incrementItems, itemsAlreadyOnCart } =
    useContext(ItemsContext)

  const itemsInCart = itemsAlreadyOnCart()
  const total = itemsInCart.reduce(
    (acc, item) => acc + item.qty * item.price,
    0,
  )

  return (
    <CheckoutContainer>
      <section>
        <div>Complete seu pedido</div>
        <div>Pagamento</div>
      </section>
      <MiniCartContainer>
        <div className="itens">
          {itemsInCart.map((item) => {
            return (
              <MiniCart
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                image={item.image}
                qty={item.qty}
                onIncrement={incrementItems}
                onDecrement={decrementItems}
                onQtyChange={(e) =>
                  changeQuantity(item.id, Number(e.target.value))
                }
                itemsAlreadyInCart={itemsAlreadyOnCart}
              />
            )
          })}
        </div>
        <div className="total">Itens Total: ${total.toFixed(2)}</div>
        <div className="delivery">Delivery: $3.00</div>
        <div className="grandTotal">Total: ${(total + 3).toFixed(2)}</div>
      </MiniCartContainer>
    </CheckoutContainer>
  )
}
