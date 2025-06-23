import LocationOnIcon from '@mui/icons-material/LocationOn'
import CancelIcon from '@mui/icons-material/Cancel'
import { useRef, useState } from "react"
import apiRequest from '../../../lib/ApiReqest'
import { Card } from '../../ui/Card'
import { Input } from '../../ui/Input'
import { Alert } from '../../ui/Alert'

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
    <Card className="w-72 relative space-y-4">
      <div className="flex items-center justify-center gap-1">
        <LocationOnIcon className="text-blue-500" />
        <span>Map-Explore</span>
      </div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input autoFocus placeholder="username" ref={usernameRef} />
        <Input type="email" placeholder="email" ref={emailRef} />
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
          Register
        </button>
        {success && <Alert title="Success">You can login now!</Alert>}
        {error && <Alert title="Error">Something went wrong!</Alert>}
      </form>
      <CancelIcon
        className="absolute top-2 right-2 cursor-pointer"
        onClick={() => setShowRegister(false)}
      />
    </Card>
  )
}
export default Register
