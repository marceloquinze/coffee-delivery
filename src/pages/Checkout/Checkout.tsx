import { useContext } from 'react'
import { MiniCart } from './components/MiniCart/MiniCart'
import { CheckoutContainer, MiniCartContainer } from './styles'
import { ItemsContext } from '../../contexts/ItemsContext'
import { Summary } from './components/MiniCart/Summary'
import { Payment } from './components/Payment/Payment'

export function Checkout() {
  const {
    changeQuantity,
    decrementItems,
    incrementItems,
    itemsInCart,
    removeItemsInCart,
    togglePayment,
    payment,
  } = useContext(ItemsContext)

  const inCart = itemsInCart

  return (
    <CheckoutContainer>
      <section>
        <div>
          <h2>Complete your order</h2>
        </div>
        <Payment togglePayment={togglePayment} payment={payment} />
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
              <Summary itemsInCart={inCart} />
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
