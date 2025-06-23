import LocationOnIcon from '@mui/icons-material/LocationOn'
import CancelIcon from '@mui/icons-material/Cancel'
import { useRef, useState } from "react"
import apiRequest from '../../../lib/ApiReqest'
import "./register.css"

import Card from '../../ui/Card'
import Input from '../../ui/Input'
import Alert from '../../ui/Alert'

const Register = ({ setShowRegister })=> {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    try {
      await apiRequest.post("/api/user/register", newUser)
      setError(false)
      setSuccess(true)
    } catch (err) {
      
      setError(true)
    }
  }
  return (
    <div className="registerContainer">
      <Card>
        <div className="logo">
          <LocationOnIcon className="logoIcon" />
          <span>Map-Explore</span>
        </div>
        <form onSubmit={handleSubmit} className="registerForm">
          <Input autoFocus placeholder="username" ref={usernameRef} />
          <Input type="email" placeholder="email" ref={emailRef} />
          <Input
            type="password"
            min="6"
            placeholder="password"
            ref={passwordRef}
          />
          <button className="registerBtn" type="submit">
            Register
          </button>
          {success && (
            <Alert>Successfull. You can login now!</Alert>
          )}
          {error && <Alert>Something went wrong!</Alert>}
        </form>
        <CancelIcon
          className="registerCancel"
          onClick={() => setShowRegister(false)}
        />
      </Card>
    </div>
  )
}
export default Register