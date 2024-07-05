import { useContext } from 'react'
import { CatalogueItem } from './CatalogueItem'
import { CatalogueContainer } from './styles'
import { ItemsContext } from '../../../../contexts/ItemsContext'

// interface Coffees {
//   id: string
//   title: string
//   description: string
//   price: number
//   tags: []
//   image: string
//   qty: number
//   onCart: boolean
// }
export function Catalogue() {
  // const [items, setItems] = useState<Coffees[]>([])

  // useEffect(() => {
  //   const url = 'coffee.json'
  //   fetch(url)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Data not found')
  //       }
  //       return response.json()
  //     })
  //     .then((data) => {
  //       setItems(data)
  //     })
  // }, [])

  // function handleIncrement(idToIncrement: string) {
  //   setItems((prevItems) =>
  //     prevItems.map((item) =>
  //       item.id === idToIncrement ? { ...item, qty: item.qty + 1 } : item,
  //     ),
  //   )
  // }
  // function handleDecrement(idToDecrement: string) {
  //   setItems((prevItems) =>
  //     prevItems.map((item) =>
  //       item.id === idToDecrement && item.qty !== 0
  //         ? { ...item, qty: item.qty - 1 }
  //         : item,
  //     ),
  //   )
  // }

  // function handleQtyChange(id: string, newQty: number) {
  //   setItems((prevItems) =>
  //     prevItems.map((item) =>
  //       item.id === id ? { ...item, qty: newQty } : item,
  //     ),
  //   )
  // }

  // function handleSentToCart(e: FormEvent<HTMLFormElement>) {
  //   e.preventDefault()
  //   const formData = new FormData(e.target as HTMLFormElement)
  //   const id = formData.get('id') as string

  //   setItems((prevItems) =>
  //     prevItems.map((item) =>
  //       String(item.id) === id ? { ...item, onCart: true } : item,
  //     ),
  //   )
  //   const qtyItemsOnCart = () => items.reduce((acc, curr) => acc + curr.qty, 0)
  //   // console.log(qtyItemsOnCart())
  // }

  // useEffect(() => {
  //   console.log(items)
  // }, [items])

  const {
    changeQuantity,
    decrementItems,
    incrementItems,
    sendItemsToCart,
    items,
    itemsAlreadyOnCart, // tirar daqui depois
  } = useContext(ItemsContext)

  // retirar depois
  const itemsInCart = itemsAlreadyOnCart()
  const total = itemsInCart.reduce(
    (acc, item) => acc + item.qty * item.price,
    0,
  )

  return (
    <div>
      <div>
        <h2>Items in Cart</h2>
        {itemsInCart.length > 0 ? (
          <ul>
            {itemsInCart.map((item) => (
              <li key={item.id}>
                {item.title} - Quantity: {item.qty} - Price:{' '}
                {(item.qty * item.price).toFixed(2)}
              </li>
            ))}
            <li>Total: {total.toFixed(2)}</li>
          </ul>
        ) : (
          <p>No items in cart</p>
        )}
      </div>

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
