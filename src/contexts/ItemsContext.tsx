import { FormEvent, ReactNode, createContext, useEffect, useState } from 'react'

interface Coffees {
  id: string
  title: string
  description: string
  price: number
  tags: []
  image: string
  qty: number
  onCart: boolean
}

interface ItemContextType {
  items: Coffees[]
  itemsOnCart: number
  incrementItems: (id: string) => void
  decrementItems: (id: string) => void
  changeQuantity: (id: string, newQty: number) => void
  sendItemsToCart: (e: FormEvent<HTMLFormElement>) => void
  itemsAlreadyOnCart: () => Coffees[]
}

export const ItemsContext = createContext({} as ItemContextType)

interface ItemsContextProviderProps {
  children: ReactNode
}

export function ItemsContextProvider({ children }: ItemsContextProviderProps) {
  const [items, setItems] = useState<Coffees[]>([])
  const [itemsOnCart, setItemsOnCart] = useState(0)

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

  function incrementItems(idToIncrement: string) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === idToIncrement ? { ...item, qty: item.qty + 1 } : item,
      ),
    )
  }
  function decrementItems(idToDecrement: string) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === idToDecrement && item.qty !== 0
          ? { ...item, qty: item.qty - 1 }
          : item,
      ),
    )
  }

  function changeQuantity(id: string, newQty: number) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, qty: newQty } : item,
      ),
    )
  }

  function sendItemsToCart(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const id = formData.get('id') as string

    setItems((prevItems) =>
      prevItems.map((item) =>
        String(item.id) === id ? { ...item, onCart: true } : item,
      ),
    )
    const qtyItemsOnCart = items.reduce((acc, curr) => acc + curr.qty, 0)
    setItemsOnCart(qtyItemsOnCart)
  }

  function itemsAlreadyOnCart() {
    return items.filter((item) => item.onCart)
  }

  //   useEffect(() => {
  //     console.log(itemsAlreadyOnCart())
  //   }, [itemsAlreadyOnCart])

  return (
    <ItemsContext.Provider
      value={{
        items,
        itemsOnCart,
        decrementItems,
        incrementItems,
        changeQuantity,
        sendItemsToCart,
        itemsAlreadyOnCart,
      }}
    >
      {children}
    </ItemsContext.Provider>
  )
}
