import { create } from 'zustand'
import { round2 } from '../utils'
import { OrderItem } from '../models/OrderModel'

type Cart = {
  items: OrderItem[]
  itemsPrice: number
  taxPrice: number
  shippingPrice: number
  totalPrice: number
}
const initialState: Cart = {
  items: [],
  itemsPrice: 0,
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
}

export const cartStore = create<Cart>(() => initialState)

export default function useCartService() {
  const { items, itemsPrice, taxPrice, shippingPrice, totalPrice } = cartStore()
  return {
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    increase: (item: OrderItem) => {
      const exist = items.find((x) => x.slug === item.slug)
      const updatedCartItems = exist
        ? items.map((x) =>
            x.slug === item.slug ? { ...exist, qty: exist.qty + 1 } : x
          )
        : [...items, { ...item, qty: 1 }]
      const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
        calcPrice(updatedCartItems)
      cartStore.setState({
        items: updatedCartItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })
    },
    decrease: (item: OrderItem) => {
      const exist = items.find((x) => x.slug === item.slug)
      if (!exist) return
      const updatedCartItems =
        exist.qty === 1
          ? items.filter((x: OrderItem) => x.slug !== item.slug)
          : items.map((x) => (item.slug ? { ...exist, qty: exist.qty - 1 } : x))
      const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
        calcPrice(updatedCartItems)
      cartStore.setState({
        items: updatedCartItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })
    },
  }
}

const calcPrice = (items: OrderItem[]) => {
  const itemsPrice = round2(
      items.reduce((acc, item) => acc + item.price * item.qty, 0)
    ),
    shippingPrice = round2(itemsPrice > 100 ? 0 : 100),
    taxPrice = round2(Number(itemsPrice * 0.15)),
    totalPrice = round2(itemsPrice + taxPrice + shippingPrice)
  return { itemsPrice, taxPrice, shippingPrice, totalPrice }
}

//1:06:00