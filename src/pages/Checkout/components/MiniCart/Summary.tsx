import { Coffees } from '../../../../contexts/ItemsContext'

interface SummaryProps {
  itemsInCart: Coffees[]
}
export function Summary({ itemsInCart }: SummaryProps) {
  const total = itemsInCart.reduce(
    (acc, item) => acc + item.qty * item.price,
    0,
  )
  return (
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
  )
}
