import { useContext } from 'react'
import { CatalogueItem } from './CatalogueItem'
import { CatalogueContainer } from './styles'
import { ItemsContext } from '../../../../contexts/ItemsContext'

export function Catalogue() {
  const {
    changeQuantity,
    decrementItems,
    incrementItems,
    sendItemsToCart,
    items,
  } = useContext(ItemsContext)

  return (
    <div>
      <CatalogueContainer>
        <h2>Our coffees</h2>
        <div className="items">
          {items.map((item) => {
            return (
              <CatalogueItem
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                price={item.price}
                tags={item.tags}
                image={item.image}
                qty={item.qty}
                onIncrement={incrementItems}
                onDecrement={decrementItems}
                onQtyChange={(e) =>
                  changeQuantity(item.id, Number(e.target.value))
                }
                onSendToCart={sendItemsToCart}
              />
            )
          })}
        </div>
      </CatalogueContainer>
    </div>
  )
}
