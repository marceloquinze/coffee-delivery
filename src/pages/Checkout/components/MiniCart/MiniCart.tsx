import { Trash } from 'phosphor-react'
import { ChangeEvent, FormEvent } from 'react'

interface MiniCartProps {
  id: string
  title: string
  price: number
  image: string
  qty: number
  onIncrement: (id: string) => void
  onDecrement: (id: string) => void
  onQtyChange: (e: ChangeEvent<HTMLInputElement>) => void
  onRemoveFromCart: (e: FormEvent<HTMLFormElement>) => void
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
  onRemoveFromCart,
}: MiniCartProps) {
  return (
    <div className="item">
      <div className="first">
        <img src={`src/assets/${image}`} alt={title} />
      </div>
      <div className="second">
        <div className="title-form">
          <h3>{title}</h3>
          <form className="controls" onSubmit={onRemoveFromCart}>
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
            <button type="submit" className="cart" name="remove">
              <Trash size={20} /> Remove
            </button>
            <input type="hidden" name="id" value={id} />
          </form>
        </div>
      </div>
      <div className="third">
        <span className="price">$ {price}</span>
      </div>
    </div>
  )
}
