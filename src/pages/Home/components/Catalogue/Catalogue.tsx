import { ChangeEvent, useEffect, useState } from 'react'
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

interface onCartItems {
  id: string
  title: string
  price: number
  image: string
  qty: number
}

export function Catalogue() {
  const [items, setItems] = useState<Coffees[]>([])
  const [onCartItems, setOnCartItems] = useState<onCartItems[]>([])
  // state to store the qty value typed by the user
  // const [qty, setQty] = useState(0)

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
  function handleDecrement(idToDecrement: string) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === idToDecrement && item.qty !== 0
          ? { ...item, qty: item.qty - 1 }
          : item,
      ),
    )
  }

  function handleQtyChange(id: string, newQty: number) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, qty: newQty } : item,
      ),
    )
  }

  // function handleQtyChange(e: ChangeEvent<HTMLInputElement>) {
  //   setQty(Number(e.target.value))
  // }

  function handleSentToCart(id: string) {}

  useEffect(() => {
    console.log(items)
  }, [items])

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
                onDecrement={handleDecrement}
                onQtyChange={(e) =>
                  handleQtyChange(item.id, Number(e.target.value))
                }
                onSendToCart={handleSentToCart}
              />
            )
          })}
        </div>
      </CatalogueContainer>
    </div>
  )
}
