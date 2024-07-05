import { ChangeEvent, FormEvent, createContext } from "react";

interface CatalogueItemProps {
	id: string
	title: string
	description: string
	price: number
	tags: []
	image: string
	qty: number
	onIncrement: (id: string) => void
	onDecrement: (id: string) => void
	onQtyChange: (e: ChangeEvent<HTMLInputElement>) => void
	onSendToCart: (e: FormEvent<HTMLFormElement>) => void
  }
export const CartContext = createContext({
	items: CatalogueItemProps[]
})