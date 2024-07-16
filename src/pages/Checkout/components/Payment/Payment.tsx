import { Bank, CreditCard, CurrencyDollar, Money } from 'phosphor-react'
import { PaymentContainer } from '../../styles'

interface PaymentProps {
  payment: string
  togglePayment: (
    e: React.MouseEvent<HTMLButtonElement>,
    paymentType: string,
  ) => void
}

export function Payment({ payment, togglePayment }: PaymentProps) {
  return (
    <PaymentContainer>
      <h4>
        <CurrencyDollar size={22} />
        Payment
      </h4>
      <p>The payment is made on delivery. Please, choose an option:</p>
      <div className="buttons">
        <button
          className={payment === 'credit' ? 'selected' : ''}
          onClick={(e) => togglePayment(e, 'credit')}
        >
          <CreditCard size={18} />
          Credit card
        </button>
        <button
          className={payment === 'debit' ? 'selected' : ''}
          onClick={(e) => togglePayment(e, 'debit')}
        >
          <Bank size={18} />
          Debit card
        </button>
        <button
          className={payment === 'money' ? 'selected' : ''}
          onClick={(e) => togglePayment(e, 'money')}
        >
          <Money size={18} />
          Money
        </button>
      </div>
    </PaymentContainer>
  )
}
