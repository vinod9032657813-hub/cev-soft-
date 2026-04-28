import { FiPlay, FiShoppingBag, FiStar, FiTrendingUp, FiTruck, FiShield, FiPercent } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Latestcollection from '../Component.js/Latestcollection';
import Bestseller from '../Component.js/Bestseller';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in">
              Welcome to
              <span className="block bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">
                Amma Nanna
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-2xl mx-auto">
              Your one-stop shop for fashion, beauty, and lifestyle products
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 text-white">
                <FiStar className="mr-2" />
                <span className="text-sm font-medium">Premium Quality</span>
              </div>
              <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 text-white">
                <FiTruck className="mr-2" />
                <span className="text-sm font-medium">Fast Delivery</span>
              </div>
              <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 text-white">
                <FiPercent className="mr-2" />
                <span className="text-sm font-medium">Best Prices</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/collection">
                <button className="group relative px-8 py-4 bg-white text-purple-600 font-bold text-lg rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                  <span className="flex items-center">
                    <FiShoppingBag className="mr-2" />
                    SHOP NOW
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <FiTruck className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Free Shipping</h3>
              <p className="text-gray-600">On orders over ₹500</p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
                <FiShield className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% secure transactions</p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <FiPercent className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Best Deals</h3>
              <p className="text-gray-600">Amazing offers daily</p>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Collection */}
      <div className="py-16 bg-gray-50">
        <Latestcollection />
      </div>

      {/* Bestsellers */}
      <div className="py-16 bg-white">
        <Bestseller />
      </div>

      {/* CTA Banner */}
      <div className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Explore our collection and find your perfect style
          </p>
          <Link to="/collection">
            <button className="px-8 py-4 bg-white text-purple-600 font-bold text-lg rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Browse Collection
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;