import { useDispatch } from 'react-redux'
import { login } from '../Slices/AuthSlice'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <button onClick={() => { dispatch(login({ username: 'user' })); navigate('/') }}>
        Login
      </button>
    </div>
  )
}
