import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { authdatecontext } from '../context/Authcontext'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../Farebase/Fair'

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

  const handleGoogleSignup = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      let user = response.user
      let name = user.displayName
      let email = user.email
      let password = user.uid + "_google_auth" // Make password longer

      const result = await axios.post(serverurl + '/api/auth/registration', {
        name,
        email,
        password
      }, { withCredentials: true })
      
      console.log('User registered in backend:', result.data)
       getCurrentUser()
      navigate('/')
      
    } catch (error) {
      console.log('Google signup error:', error)
      alert(error.response?.data?.message || error.message)
    }
  }

  const handleMicrosoftSignup = () => {
    console.log('Microsoft signup clicked')
    // Add your Microsoft OAuth logic here
  }

  const handleAppleSignup = () => {
    console.log('Apple signup clicked')
    // Add your Apple OAuth logic here
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

        <div className="space-y-4 mb-6">
          <button 
            type="button"
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="font-medium text-gray-700">Continue with Google</span>
          </button>

          <button 
            type="button"
            onClick={handleMicrosoftSignup}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#00A4EF" d="M0 0h11.377v11.372H0z"/>
              <path fill="#FFB900" d="M12.623 0H24v11.372H12.623z"/>
              <path fill="#7FBA00" d="M0 12.628h11.377V24H0z"/>
              <path fill="#F25022" d="M12.623 12.628H24V24H12.623z"/>
            </svg>
            <span className="font-medium text-gray-700">Continue with Microsoft</span>
          </button>

          <button 
            type="button"
            onClick={handleAppleSignup}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" fill="#000"/>
            </svg>
            <span className="font-medium text-gray-700">Continue with Apple</span>
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or register with email</span>
          </div>
        </div>

        <form onSubmit={handlesignup} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={Name}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={Password}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              placeholder="Enter your password"
              required
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
