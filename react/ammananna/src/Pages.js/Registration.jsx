import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { authdatecontext } from '../context/Authcontext'

const Registration = () => {
  let {serverurl}=useContext(authdatecontext)
  const navigate = useNavigate()
  
  const [Name, setName] = useState("")
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  
  const handlesignup = async (e) => {
    e.preventDefault()
    try {
      const result = await axios.post(serverurl + '/api/auth/registration', {
        name: Name,
        password: Password,
        email: Email
      }, { withCredentials: true })
      console.log('Registration successful:', result.data)
      navigate('/login')
    } catch (error) {
      console.log('Registration error:', error.response?.data || error.message)
      alert(error.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-4 cursor-pointer" onClick={() => navigate("/")}>
            <img src="/logo.png" alt="logo" className="w-12 h-12 rounded-full" />
            <h2 className="text-2xl font-bold text-gray-800">cev meta</h2>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Registration</h1>
          <p className="text-gray-600 mt-2">Join us today</p>
        </div>

        <form onSubmit={handlesignup} className="space-y-6">
          <div>
            <label htmlFor="reg-name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              id="reg-name"
              name="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={Name}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              placeholder="Enter your name"
              required
              aria-label="Name"
            />
          </div>

          <div>
            <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              id="reg-email"
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              placeholder="Enter your email"
              required
              aria-label="Email"
            />
          </div>

          <div>
            <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              id="reg-password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={Password}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              placeholder="Enter your password"
              required
              aria-label="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-lg hover:shadow-xl"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Do you have account already?{' '}
            <span
              onClick={() => navigate('/login')}
              className="text-indigo-600 font-semibold hover:text-indigo-700 cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Registration
