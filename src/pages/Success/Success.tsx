import { SuccessContainer } from './style'
import SuccessImg from '../../assets/success.svg'
import { OrderSummary } from './components/OrderSummary/OrderSummary'
import { UserContext } from '../../contexts/UserContext'
import { useContext } from 'react'

export function Success() {
  const { order } = useContext(UserContext)
  return (
    <SuccessContainer>
      <div className="left">
        <h1>Wow! Order placed successfully!</h1>
        <p>
          You just need to wait a few minutes and your coffee will be on its way
        </p>
        <OrderSummary order={order} />
      </div>

      <div className="right">
        <img src={SuccessImg} alt="" />
      </div>
    </SuccessContainer>
  )
}
