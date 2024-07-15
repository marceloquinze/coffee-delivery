import { ChangeEvent } from 'react'

interface Coffees {
  id: string
  title: string
  price: number
  image: string
  qty: number
  onCart: boolean
}
interface MiniCartProps {
  id: string
  title: string
  price: number
  image: string
  qty: number
  onIncrement: (id: string) => void
  onDecrement: (id: string) => void
  onQtyChange: (e: ChangeEvent<HTMLInputElement>) => void
  itemsAlreadyInCart: () => Coffees[]
}

export function MiniCart({
  id,
  title,
  price,
  image,
  qty,
  onIncrement,
  onDecrement,
  onQtyChange,
}: MiniCartProps) {
  return (
    <div className="item">
      <div className="first">
        <img src={`src/assets/${image}`} alt={title} />
      </div>
      <div className="second">
        <div className="title-price">
          <h3>{title}</h3>
          <span className="price">
            $ <b>{price}</b>
          </span>
        </div>
        <form className="controls" /* onSubmit={onSendToCart} */>
          <div className="counter">
            <a className="decrement" onClick={() => onDecrement(id)}>
              -
            </a>
            <input
              className="qty"
              min={0}
              name="qty"
              value={qty}
              onChange={onQtyChange}
            />
            <a className="increment" onClick={() => onIncrement(id)}>
              +
            </a>
          </div>
          <input type="hidden" name="id" value={id} />
        </form>
      </div>
    </div>
  )
}
