import { useContext } from 'react'
import { MiniCart } from './components/MiniCart/MiniCart'
import { CheckoutContainer, MiniCartContainer } from './styles'
import { ItemsContext } from '../../contexts/ItemsContext'

export function Checkout() {
  const {
    changeQuantity,
    decrementItems,
    incrementItems,
    itemsInCart,
    removeItemsInCart,
  } = useContext(ItemsContext)

  const inCart = itemsInCart
  const total = itemsInCart.reduce(
    (acc, item) => acc + item.qty * item.price,
    0,
  )

  return (
    <CheckoutContainer>
      <section>
        <div>
          <h2>Complete your order</h2>
        </div>
        <div>
          <h2>Payment</h2>
        </div>
      </section>
      <section>
        <h2>Selected coffees</h2>
        <MiniCartContainer>
          {inCart.length > 0 ? (
            <>
              <div className="items">
                {inCart.map((item) => {
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
                      onRemoveFromCart={removeItemsInCart}
                    />
                  )
                })}
              </div>
              <div className="summary">
                <div className="total">
                  <p>
                    Itens Total: <span>$ {total.toFixed(2)}</span>
                  </p>
                </div>
                <div className="delivery">
                  <p>
                    Delivery: <span>$ 3.00</span>
                  </p>
                </div>
                <div className="grandTotal">
                  <p>
                    Total: <span>$ {(total + 3).toFixed(2)}</span>
                  </p>
                </div>
              </div>
              <div className="confirm">
                <button type="submit">Confirm order</button>
              </div>
            </>
          ) : (
            <p>No items in your cart.</p>
          )}
        </MiniCartContainer>
      </section>
    </CheckoutContainer>
  )
}
