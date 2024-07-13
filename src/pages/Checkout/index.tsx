import { MiniCart } from './components/MiniCart/MiniCart'
import { CheckoutContainer } from './styles'

export function Checkout() {
  return (
    <CheckoutContainer>
      <section>
        <div>Complete seu pedido</div>
        <div>Pagamento</div>
      </section>
      <MiniCart />
    </CheckoutContainer>
  )
}
