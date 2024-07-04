import { useEffect, useState } from 'react'
import { CatalogueItem } from './CatalogueItem'
import { CatalogueContainer } from './styles'

interface Coffees {
  id: string
  title: string
  description: string
  price: number
  tags: []
  image: string
  qty: number
}

export function Catalogue() {
  const [items, setItems] = useState<Coffees[]>([])

  useEffect(() => {
    const url = 'coffee.json'
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Data not found')
        }
        return response.json()
      })
      .then((data) => {
        setItems(data)
      })
  }, [])

  function handleIncrement(idToIncrement: string) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === idToIncrement ? { ...item, qty: item.qty + 1 } : item,
      ),
    )
  }

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
                onIncrement={handleIncrement}
              />
            )
          })}
        </div>
      </CatalogueContainer>
    </div>
  )
}
