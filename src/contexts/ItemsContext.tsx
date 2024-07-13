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
  itemsOnCart: number // a state used to keep track of items in cart and pass it to Header component.
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
    // update items in cart number using an accumulator
    const qtyItemsOnCart = items.reduce((acc, curr) => acc + curr.qty, 0)
    // update state with items in cart
    setItemsOnCart(qtyItemsOnCart)
  }

  // what items are already in cart?
  function itemsAlreadyOnCart() {
    return items.filter((item) => item.onCart && item.qty > 0)
  }

  function removeItemsInCart() {
    // to be implemented
    // also remove when item.qty === 0
  }

  // useEffect(() => {
  //   console.log(itemsOnCart)
  // }, [itemsOnCart])

  return (
    <ItemsContext.Provider
      // this goes around every element that needs values coming from this context
      // you'll find it on App.tsx
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
