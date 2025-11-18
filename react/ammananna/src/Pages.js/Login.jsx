import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authdatecontext } from '../context/Authcontext'
import axios from 'axios'
import { userdataContext } from '../context/Usercontext'

const Login = () => {
  const navigate = useNavigate()
   const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  let {serverurl} =useContext(authdatecontext)
let {getCurrentUser}=useContext(userdataContext)

  const handlelogin = async (e) => {
    e.preventDefault()
    try {
      const result = await axios.post(serverurl + '/api/auth/login', {
        email: Email,
        password: Password
      }, { withCredentials: true })
      console.log('Login successful:', result.data)
      getCurrentUser()
      navigate('/')
    } catch (error) {
      console.log('Login error:', error.response?.data || error.message)
      alert(error.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-4 cursor-pointer" onClick={() => navigate("/")}>
            <img src="/logo.png" alt="logo" className="w-12 h-12 rounded-full" />
            <h2 className="text-2xl font-bold text-gray-800">cev meta</h2>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Login</h1>
          <p className="text-gray-600 mt-2">Login to your account</p>
        </div>

        <form onSubmit={handlelogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
               onChange={(e) => setPassword(e.target.value)}
              value={Password}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-200 shadow-lg hover:shadow-xl"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Are you new user?{' '}
            <span
              onClick={() => navigate('/registration')}
              className="text-purple-600 font-semibold hover:text-purple-700 cursor-pointer"
            >
              Registration
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
