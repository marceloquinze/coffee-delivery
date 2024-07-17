import { UserDetailsComp } from '../Checkout/components/UserDetails/UserDetails'
import { UserContainer } from './styles'
import { UserContext } from '../../contexts/UserContext'
import { useContext } from 'react'
import { Package } from 'phosphor-react'

export function User() {
  const { getUserDetails, userDetails, invalidFields, orderHistory } =
    useContext(UserContext)
  return (
    <UserContainer>
      <div className="tabs">
        <input type="radio" name="tabs" id="address" defaultChecked />
        <label htmlFor="address">Address</label>
        <input type="radio" name="tabs" id="history" />
        <label htmlFor="history">Order History</label>

        <div className="content">
          <div className="content-tab" id="content1">
            <h1>Delivery Address</h1>
            <UserDetailsComp
              getUserDetails={getUserDetails}
              userDetails={userDetails}
              invalidFields={invalidFields}
            />
          </div>
          <div className="content-tab" id="content2">
            <h1>Order History</h1>
            {orderHistory.length ? (
              orderHistory.map((order) => (
                <div key={order.id} className="eachOrder">
                  <Package size={32} />
                  <div>
                    <p>
                      <strong>Order number:</strong> {order.id}
                    </p>
                    <p>
                      <strong>Date:</strong>{' '}
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Payment details:</strong> $
                      {order.total.toFixed(2)} payed in {order.payment}
                    </p>
                    <p>
                      <strong>Ordered items:</strong>
                    </p>
                    {order.itemsInCart.map((item) => (
                      <ul key={item.id}>
                        <li>
                          {item.qty}x {item.title}
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>You do not have any order yet</p>
            )}
          </div>
        </div>
      </div>
    </UserContainer>
  )
}
