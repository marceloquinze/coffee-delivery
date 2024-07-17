import { CurrencyDollar, MapPin, Package, Timer } from 'phosphor-react'
import { Order } from '../../../../contexts/UserContext'
import { OrderSummaryContainer } from '../../style'

interface OrderSummaryProps {
  order: Order
}

export function OrderSummary({ order }: OrderSummaryProps) {
  return (
    <OrderSummaryContainer>
      <div className="number">
        <Package size={22} weight="fill" />
        <div>
          Order number: <br />
          {order.id}
        </div>
      </div>
      <div className="address">
        <MapPin size={22} weight="fill" />
        <div>
          Delivery at:{' '}
          <strong>
            {order.userAddress.street}, {order.userAddress.number}
          </strong>
          <br />
          {order.userAddress.neighborhood} - {order.userAddress.city},{' '}
          {order.userAddress.uf}
        </div>
      </div>
      <div className="delivery">
        <Timer size={22} weight="fill" />
        <div>
          Delivery estimate <br /> <strong>20 min - 30 min</strong>
        </div>
      </div>
      <div className="payment">
        <CurrencyDollar size={22} weight="fill" />
        <div>
          Payment type: <br />
          <strong>{order.payment}</strong>
        </div>
      </div>
    </OrderSummaryContainer>
  )
}
