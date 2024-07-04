import { ShoppingCart } from 'phosphor-react'
import { CatalogueItemContainer } from './styles'
interface CatalogueItemProps {
  id: string
  title: string
  description: string
  price: number
  tags: []
  image: string
  qty: number
  onIncrement: (id: string) => void
}

export function CatalogueItem({
  id,
  title,
  description,
  price,
  tags,
  image,
  qty,
  onIncrement,
}: CatalogueItemProps) {
  return (
    <CatalogueItemContainer>
      <img src={`src/assets/${image}`} alt={title} />
      <div className="tags">
        {tags.map((item, index) => {
          return (
            <span className="coffeeType" key={index}>
              {item}
            </span>
          )
        })}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="controls">
        <span className="price">
          $ <b>{price}</b>
        </span>
        <div className="counter">
          <button className="decrement">-</button>
          <div className="qty">{qty}</div>
          <button className="increment" onClick={() => onIncrement(id)}>
            +
          </button>
        </div>
        <a className="cart">
          <ShoppingCart weight="fill" size={24} />
        </a>
      </div>
    </CatalogueItemContainer>
  )
}
