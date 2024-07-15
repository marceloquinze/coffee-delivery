import { FormEvent, ReactNode, createContext, useEffect, useState } from 'react'

export interface Coffees {
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
  itemsInCart: Coffees[]
  incrementItems: (id: string) => void
  decrementItems: (id: string) => void
  changeQuantity: (id: string, newQty: number) => void
  sendItemsToCart: (e: FormEvent<HTMLFormElement>) => void
  removeItemsInCart: (e: FormEvent<HTMLFormElement>) => void
}

export const ItemsContext = createContext({} as ItemContextType)

interface ItemsContextProviderProps {
  children: ReactNode
}

export function ItemsContextProvider({ children }: ItemsContextProviderProps) {
  const [items, setItems] = useState<Coffees[]>(() => {
    // initial items are fetched from JSON file, then stored in localStorage, then fetched here
    const initialItems = localStorage.getItem(
      '@coffee-delivery:initial-items-1.0.0',
    )
    return initialItems ? JSON.parse(initialItems) : []
  })
  const [itemsInCart, setItemsInCart] = useState<Coffees[]>(() => {
    // initial state of the cart
    const savedCartItems = localStorage.getItem(
      '@coffee-delivery:itemsInCart-1.0.0',
    )
    return savedCartItems ? JSON.parse(savedCartItems) : []
  })

  // initial data comes from a JSON file
  useEffect(() => {
    if (items.length === 0) {
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
    }
  }, [items.length])

  useEffect(() => {
    // as soon as items are fetched from the JSON file, they'll be added to localStorage
    localStorage.setItem(
      '@coffee-delivery:initial-items-1.0.0',
      JSON.stringify(items),
    )
  }, [items])

  useEffect(() => {
    // as soon as initialItems qty is changed, we create a new storage containing only items w/ qty set
    // this will be triggered by the sendItemsToCart function below
    const updatedCartItems = items.filter((item) => item.onCart && item.qty > 0)
    setItemsInCart(updatedCartItems)
    localStorage.setItem(
      '@coffee-delivery:itemsInCart-1.0.0',
      JSON.stringify(updatedCartItems),
    )
  }, [items])

  function incrementItems(idToIncrement: string) {
    setItems((prevState) =>
      prevState.map((item) =>
        item.id === idToIncrement ? { ...item, qty: item.qty + 1 } : item,
      ),
    )
  }
  function decrementItems(idToDecrement: string) {
    setItems((prevState) =>
      prevState.map((item) =>
        item.id === idToDecrement && item.qty !== 0
          ? { ...item, qty: item.qty - 1 }
          : item,
      ),
    )
  }

  // this will be triggered whenever the qty input changes,
  // whether it is via +/- buttons or direct typing a value
  // this can help make this a controlled input
  function changeQuantity(id: string, newQty: number) {
    setItems((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, qty: newQty } : item,
      ),
    )
  }

  // this will be triggered once we click on the cart button (onSendToCart)
  // via form event
  function sendItemsToCart(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const id = formData.get('id') as string

    // map all items and update setItems state passing onCart as true
    setItems((prevState) =>
      prevState.map((item) =>
        String(item.id) === id ? { ...item, onCart: true } : item,
      ),
    )
  }

  function removeItemsInCart(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const id = formData.get('id') as string

    // update setItemsInCart state passing onCart as false
    setItems((prevState) =>
      prevState.map((item) =>
        String(item.id) === id ? { ...item, onCart: false, qty: 0 } : item,
      ),
    )
  }

  return (
    <ItemsContext.Provider
      // this goes around every element that needs values coming from this context
      // you'll find it on App.tsx
      value={{
        items,
        itemsInCart,
        decrementItems,
        incrementItems,
        changeQuantity,
        sendItemsToCart,
        removeItemsInCart,
      }}
    >
      {children}
    </ItemsContext.Provider>
  )
}
