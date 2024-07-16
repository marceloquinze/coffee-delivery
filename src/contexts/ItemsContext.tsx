import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from 'react'

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

export interface UserDetails {
  cep: string
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  uf: string
}

interface ItemContextType {
  items: Coffees[]
  itemsInCart: Coffees[]
  payment: string
  userDetails: UserDetails
  validationMsg: string[]
  invalidFields: { [key: string]: boolean }
  incrementItems: (id: string) => void
  decrementItems: (id: string) => void
  changeQuantity: (id: string, newQty: number) => void
  sendItemsToCart: (e: FormEvent<HTMLFormElement>) => void
  removeItemsInCart: (e: FormEvent<HTMLFormElement>) => void
  togglePayment: (e: MouseEvent<HTMLButtonElement>, paymentType: string) => void
  getUserDetails: (e: ChangeEvent<HTMLInputElement>) => void
  createOrder: (e: MouseEvent<HTMLButtonElement>) => void
}

export const ItemsContext = createContext({} as ItemContextType)

interface ItemsContextProviderProps {
  children: ReactNode
}

export function ItemsContextProvider({ children }: ItemsContextProviderProps) {
  // ------ STATES ------
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

  const [payment, setPayment] = useState<string>(() => {
    const savedPayment = localStorage.getItem('@coffee-delivery:payment-1.0.0')
    return savedPayment ? JSON.parse(savedPayment) : ''
  })

  const [userDetails, setUserDetails] = useState<UserDetails>(() => {
    const savedUserDetails = localStorage.getItem(
      '@coffee-delivery:userDetails-1.0.0',
    )
    return savedUserDetails ? JSON.parse(savedUserDetails) : {}
  })

  const [validationMsg, setValidationMsg] = useState<string[]>([])
  const [invalidFields, setInvalidFields] = useState<{
    [key: string]: boolean
  }>({})

  // ------ EFFECTS ------

  // 1. the initial data comes from a JSON file
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

  // 2. initial data is stored in localStorage
  useEffect(() => {
    // as soon as items are fetched from the JSON file, they'll be added to localStorage
    localStorage.setItem(
      '@coffee-delivery:initial-items-1.0.0',
      JSON.stringify(items),
    )
  }, [items])

  // 3. cart items are stored in localStorage
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

  // 4. set payment
  useEffect(() => {
    localStorage.setItem(
      '@coffee-delivery:payment-1.0.0',
      JSON.stringify(payment),
    )
  }, [payment])

  // 5. set user details
  useEffect(() => {
    localStorage.setItem(
      '@coffee-delivery:userDetails-1.0.0',
      JSON.stringify(userDetails),
    )
  }, [userDetails])

  // ------ FUNCTIONS ------

  // 1. toggle payment
  function togglePayment(
    e: React.MouseEvent<HTMLButtonElement>,
    paymentType: string,
  ) {
    e.preventDefault()
    setPayment(paymentType)
  }

  // 2. increment and decrement
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

  // 3. change quantity
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

  // 4. send items to cart
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

  // 5. remove items from cart
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

  // 6. clear cart

  // 7. get user details
  function getUserDetails(e: ChangeEvent<HTMLInputElement>) {
    // console.log(e.target.value)
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
  }

  interface Validation {
    valid: boolean
    msgs: string[]
    fields: { [key: string]: boolean }
  }

  // 8a. validate order
  function validateOrder(): Validation {
    const messages: string[] = []
    const fields: { [key: string]: boolean } = {}

    if (!userDetails.cep) {
      messages.push('Please fill in the CEP field')
      fields.cep = true
    } else if (!userDetails.cep.match(/^[0-9]{5}-[0-9]{3}$/)) {
      messages.push('Invalid CEP')
      fields.cep = true
    }

    if (!userDetails.street) {
      messages.push('Please fill in the street field')
      fields.street = true
    }

    if (!userDetails.number) {
      messages.push('Please fill in the number field')
      fields.number = true
    } else if (!userDetails.number.match(/^\d+$/)) {
      messages.push('Invalid number')
      fields.number = true
    }

    if (!userDetails.neighborhood) {
      messages.push('Please fill in the neighborhood field')
      fields.neighborhood = true
    }

    if (!userDetails.city) {
      messages.push('Please fill in the city field')
      fields.city = true
    }

    if (!userDetails.uf) {
      messages.push('Please fill in the UF field')
      fields.uf = true
    }

    if (!payment) {
      messages.push('Please select a payment method')
      fields.payment = true
    }

    if (!itemsInCart.length) {
      messages.push('Cart is empty')
    }

    return { valid: messages.length === 0, msgs: messages, fields }
  }

  // 8. create order
  function createOrder(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    const validation = validateOrder()
    if (!validation.valid) {
      setValidationMsg(validation.msgs)
      setInvalidFields(validation.fields)
    } else {
      setValidationMsg([])
      setInvalidFields({})
      alert('Order created!')
    }
  }

  useEffect(() => {
    console.log(invalidFields)
  }, [invalidFields])

  // ------ RETURN ------
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
        togglePayment,
        payment,
        getUserDetails,
        userDetails,
        createOrder,
        validationMsg,
        invalidFields,
      }}
    >
      {children}
    </ItemsContext.Provider>
  )
}
