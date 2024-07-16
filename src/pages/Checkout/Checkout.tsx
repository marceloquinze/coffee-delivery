import { useContext } from 'react'
import { MiniCart } from './components/MiniCart/MiniCart'
import { CheckoutContainer, MiniCartContainer } from './styles'
import { ItemsContext } from '../../contexts/ItemsContext'
import { Summary } from './components/MiniCart/Summary'
import { Payment } from './components/Payment/Payment'
import { UserDetailsComp } from './components/UserDetails/UserDetails'

export function Checkout() {
  const {
    changeQuantity,
    decrementItems,
    incrementItems,
    itemsInCart,
    removeItemsInCart,
    togglePayment,
    payment,
    getUserDetails,
    userDetails,
    createOrder,
    validationMsg,
    invalidFields,
  } = useContext(ItemsContext)

  const inCart = itemsInCart

  return (
    <CheckoutContainer>
      <section>
        <h2>Complete your order</h2>
        <UserDetailsComp
          getUserDetails={getUserDetails}
          userDetails={userDetails}
          invalidFields={invalidFields}
        />
        <Payment
          togglePayment={togglePayment}
          payment={payment}
          invalidFields={invalidFields}
        />
      </section>
      <aside>
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
                <button onClick={createOrder} type="submit">
                  Confirm order
                </button>
                {validationMsg &&
                  validationMsg.map((msg) => <p key={msg}>{msg}</p>)}
              </div>
            </>
          ) : (
            <p>No items in your cart.</p>
          )}
        </MiniCartContainer>
      </aside>
    </CheckoutContainer>
  )
}
