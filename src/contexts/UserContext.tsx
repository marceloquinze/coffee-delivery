import {
  ChangeEvent,
  MouseEvent,
  ReactNode,
  createContext,
  useEffect,
  useState,
  useContext,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { ItemsContext } from './ItemsContext'

export interface UserDetails {
  cep: string
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  uf: string
}

interface UserDetailsProps {
  street: string
  number: string
  neighborhood: string
  city: string
  uf: string
}
export interface Order {
  id: string
  userAddress: UserDetailsProps
  payment: string
}

interface UserContextType {
  payment: string
  userDetails: UserDetails
  validationMsg: string[]
  invalidFields: { [key: string]: boolean }
  order: Order
  togglePayment: (e: MouseEvent<HTMLButtonElement>, paymentType: string) => void
  getUserDetails: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) => void
  createOrder: (e: MouseEvent<HTMLButtonElement>) => void
}

export const UserContext = createContext({} as UserContextType)

interface UserContextProviderProps {
  children: ReactNode
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const { itemsInCart, clearCart } = useContext(ItemsContext)
  const navigate = useNavigate()

  // ------ STATES ------
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

  const [order, setOrder] = useState<Order>(() => {
    const savedOrder = localStorage.getItem('@coffee-delivery:order-1.0.0')
    return savedOrder ? JSON.parse(savedOrder) : {}
  })

  // ------ EFFECTS ------
  // 1. set payment
  useEffect(() => {
    localStorage.setItem(
      '@coffee-delivery:payment-1.0.0',
      JSON.stringify(payment),
    )
  }, [payment])

  // 2. set user details
  useEffect(() => {
    localStorage.setItem(
      '@coffee-delivery:userDetails-1.0.0',
      JSON.stringify(userDetails),
    )
  }, [userDetails])

  // 3. set order
  useEffect(() => {
    localStorage.setItem('@coffee-delivery:order-1.0.0', JSON.stringify(order))
  }, [order])

  // ------ FUNCTIONS ------

  // 1. toggle payment
  function togglePayment(
    e: React.MouseEvent<HTMLButtonElement>,
    paymentType: string,
  ) {
    e.preventDefault()
    setPayment(paymentType)
  }

  // 7. get user details
  function getUserDetails(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) {
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
    } else if (!userDetails.number.match(/^[1-9]\d*$/)) {
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

      const { street, number, neighborhood, city, uf } = userDetails

      // create order
      setOrder({
        id: uuidv4().toString().substring(0, 8),
        userAddress: { street, number, neighborhood, city, uf },
        payment,
      })

      // clear cart
      // clearCart()

      // redirect
      navigate('/success')
    }
  }

  useEffect(() => {
    console.log(order)
  }, [order])

  // ------ RETURN ------
  return (
    <UserContext.Provider
      // this goes around every element that needs values coming from this context
      // you'll find it on App.tsx
      value={{
        togglePayment,
        payment,
        getUserDetails,
        userDetails,
        createOrder,
        validationMsg,
        invalidFields,
        order,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
