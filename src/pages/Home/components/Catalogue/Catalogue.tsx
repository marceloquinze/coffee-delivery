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

  return (
    <div>
      <CatalogueContainer>
        <h2>Our coffees</h2>
        <div className="items">
          {items.map((item) => {
            return (
              <CatalogueItem
                key={item.id}
                title={item.title}
                description={item.description}
                price={item.price}
                tags={item.tags}
                image={item.image}
              />
            )
          })}
        </div>
      </CatalogueContainer>
    </div>
  )
}
