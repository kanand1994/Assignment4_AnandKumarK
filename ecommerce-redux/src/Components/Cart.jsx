import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../Slices/CartSlice'

export default function Cart() {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const total = cart.reduce((sum, i) => sum + i.price, 0)

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Cart</h2>
      {cart.map((item, idx) => (
        <div key={idx}>
          {item.title} - ₹{item.price}
          <button onClick={() => dispatch(removeFromCart(idx))}>Remove</button>
        </div>
      ))}
      <h3>Total: ₹{total.toFixed(2)}</h3>
    </div>
  )
}
