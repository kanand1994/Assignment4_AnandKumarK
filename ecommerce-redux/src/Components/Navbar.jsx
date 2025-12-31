import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Slices/AuthSlice'

export default function Navbar() {
  const cart = useSelector((state) => state.cart)
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  return (
    <nav style={{ padding: 10, background: '#222', color: '#fff' }}>
      <Link to="/" style={{ color: '#fff', marginRight: 10 }}>Home</Link>
      <Link to="/cart" style={{ color: '#fff', marginRight: 10 }}>
        Cart ({cart.length})
      </Link>
      {!auth.isAuthenticated ? (
        <>
          <Link to="/login" style={{ color: '#fff', marginRight: 10 }}>Login</Link>
          <Link to="/register" style={{ color: '#fff' }}>Register</Link>
        </>
      ) : (
        <button onClick={() => dispatch(logout())}>Logout</button>
      )}
    </nav>
  )
}
