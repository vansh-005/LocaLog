import LocationOnIcon from '@mui/icons-material/LocationOn'
import CancelIcon from '@mui/icons-material/Cancel'
import { useRef, useState , useContext } from "react"
import apiRequest from '../../../lib/ApiReqest'

import { AuthContext } from '../../../context/AuthContext'
import { Card } from '../../ui/Card'
import { Input } from '../../ui/Input'
import { Alert } from '../../ui/Alert'
import Swal from 'sweetalert2' //Sweet alert


const Login = ({ setShowLogin }) =>{
  const [error, setError] = useState(false)
  const { updateUser , myStorage } = useContext(AuthContext)
  const usernameRef = useRef()
  const passwordRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    }
    try {
        const res = await apiRequest.post("/api/user/login", user)
        updateUser(res.data.username)
        myStorage.setItem('user', res.data.username)
        setShowLogin(false)
        const currentUsername = myStorage.getItem("user")
        
        //Sweet alert for success login
        Swal.fire({
          toast: true,
          text: `Hello ${currentUsername}!`,
          timer: 4000, 
          timerProgressBar: true,
          position: "top",
          showConfirmButton: false
      })
    } catch (err) {
      setError(true)
    }
  }

  return (
    <Card className="w-72 relative space-y-4">
      <div className="flex items-center justify-center gap-1">
        <LocationOnIcon className="text-red-500" />
        <span>Map-Explore</span>
      </div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input autoFocus placeholder="username" ref={usernameRef} />
        <Input
          type="password"
          min="6"
          placeholder="password"
          ref={passwordRef}
        />
        <button
          className="w-full rounded-md bg-blue-600 px-3 py-2 text-sm text-white"
          type="submit"
        >
          Login
        </button>
        {error && <Alert title="Error">Something went wrong!</Alert>}
      </form>
      <CancelIcon
        className="absolute top-2 right-2 cursor-pointer"
        onClick={() => setShowLogin(false)}
      />
    </Card>
  )
}
export default Login
