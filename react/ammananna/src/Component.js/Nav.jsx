import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch, FiUser, FiShoppingCart, FiHome, FiGrid, FiInfo, FiMail, FiPackage } from 'react-icons/fi'
import { ShopDataContext } from '../context/ShopContext'

const Nav = () => {
  const navigate = useNavigate()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { getCartCount, searchProducts } = useContext(ShopDataContext)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      searchProducts(searchQuery)
      navigate('/product')
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  const navLinks = [
    { name: 'Home', path: '/', icon: FiHome },
    { name: 'Collection', path: '/collection', icon: FiGrid },
    { name: 'Products', path: '/product', icon: FiInfo },
    { name: 'My Orders', path: '/my-orders', icon: FiPackage },
    { name: 'Contact', path: '/cantact', icon: FiMail }
  ]

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="bg-black shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
              <img 
                src="/logo.png" 
                alt="Cev Meta Logo" 
                className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-500 ring-offset-2"
              />
              <span className="text-2xl font-bold text-white">
                cev meta
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => navigate(link.path)}
                  className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* Search Icon */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-white hover:text-gray-300 hover:bg-gray-800 rounded-full transition-all duration-200"
              >
                <FiSearch className="h-5 w-5" />
              </button>

              {/* Login Icon */}
              <button
                onClick={() => navigate('/login')}
                className="p-2 text-white hover:text-gray-300 hover:bg-gray-800 rounded-full transition-all duration-200"
              >
                <FiUser className="h-5 w-5" />
              </button>

              {/* Cart Icon */}
              <button
                onClick={() => navigate('/cart')}
                className="p-2 text-white hover:text-gray-300 hover:bg-gray-800 rounded-full transition-all duration-200 relative"
              >
                <FiShoppingCart className="h-5 w-5" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                    {getCartCount()}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search Bar (Expandable) */}
          {isSearchOpen && (
            <div className="pb-4">
              <form onSubmit={handleSearch} className="relative max-w-md mx-auto">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  autoFocus
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm hover:bg-indigo-700 transition-colors duration-200"
                >
                  Search
                </button>
              </form>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Bottom Navigation (YouTube Style) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50">
        <div className="flex justify-around items-center py-2">
          {navLinks.map((link) => {
            const IconComponent = link.icon
            return (
              <button
                key={link.name}
                onClick={() => navigate(link.path)}
                className="flex flex-col items-center justify-center p-2 text-white hover:text-gray-300 transition-colors duration-200 min-w-0 flex-1"
              >
                <IconComponent className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium truncate">{link.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Add padding to body content for mobile bottom nav */}
      <div className="md:hidden h-16"></div>
    </>
  )
}

export default Nav