import React, { useState } from 'react'
import { request } from '../../api'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../../redux/slices/token-slice'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignIn = e => {
    e.preventDefault()
    setLoading(true)
    let formData = new FormData(e.target)
    const user = Object.fromEntries(formData)

    request
      .post("auth/signin-admin", user)
      .then(res => {
        dispatch(signIn(res.data.access_token))
        navigate("/admin")
      })
      .catch(err => {
        alert(err.response.data.message.message)
      })
      .finally(() => setLoading(false))
  }
  

  return (
    <div>
      <h2>Login</h2>
      <form
        onSubmit={handleSignIn}
        action=""
        className="flex flex-col gap-3 max-w-[500px] mx-auto my-[50px]"
      >
        <input type="email" name="email" className="border py-2 px-4" placeholder="Enter email" />
        <input type="password" name="password" className="border py-2 px-4" placeholder="Enter password" />
        <button disabled={loading} className="border bg-blue-600 text-white py-2 px-4">{loading ? "Loading..." : "Sign In"}</button>
      </form>
    </div>
  );
}

export default Login