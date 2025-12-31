import { useDispatch } from 'react-redux'
import { register } from '../Slices/AuthSlice'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div style={{ padding: 20 }}>
      <h2>Register</h2>
      <button onClick={() => { dispatch(register({ username: 'newuser' })); navigate('/') }}>
        Register
      </button>
    </div>
  )
}
