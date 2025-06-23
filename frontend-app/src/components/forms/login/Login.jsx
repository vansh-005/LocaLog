import LocationOnIcon from '@mui/icons-material/LocationOn'
import CancelIcon from '@mui/icons-material/Cancel'
import { useRef, useState , useContext } from "react"
import apiRequest from '../../../lib/ApiReqest'

import Card from '../../ui/Card'
import Input from '../../ui/Input'
import Alert from '../../ui/Alert'

import { AuthContext } from '../../../context/AuthContext'
import "./login.css"
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
    <div className="loginContainer">
      <Card>
        <div className="logo">
          <LocationOnIcon className="logoIcon" />
          <span>Map-Explore</span>
        </div>
        <form onSubmit={handleSubmit} className="loginForm">
          <Input autoFocus placeholder="username" ref={usernameRef} />
          <Input
            type="password"
            min="6"
            placeholder="password"
            ref={passwordRef}
          />
          <button className="loginBtn" type="submit">
            Login
          </button>
          {error && <Alert>Something went wrong!</Alert>}
        </form>
        <CancelIcon
          className="loginCancel"
          onClick={() => setShowLogin(false)}
        />
      </Card>
    </div>
  )
}
export default Login