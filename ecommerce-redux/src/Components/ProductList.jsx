import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../Slices/ProductSlice'
import { addToCart } from '../Slices/CartSlice'

export default function ProductList() {
  const dispatch = useDispatch()
  const { items, status } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  if (status === 'loading') return <h2>Loading...</h2>

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, padding: 20 }}>
      {items.map((p) => (
        <div key={p.id} style={{ border: '1px solid #ccc', padding: 10 }}>
          <img src={p.image} height="100" />
          <h4>{p.title}</h4>
          <p>₹{p.price}</p>
          <button onClick={() => dispatch(addToCart(p))}>Add to Cart</button>
        </div>
      ))}
    </div>
  )
}
