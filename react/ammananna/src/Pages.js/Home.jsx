import { FiPlay, FiShoppingBag, FiStar, FiTrendingUp } from 'react-icons/fi';
import Latestcollection from '../Component.js/Latestcollection';
import Bestseller from '../Component.js/Bestseller';
import Product from './Product';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      
      
      {/* Hero Section with Video Background */}
      <div className="relative h-screen overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/shopping-hero.mp4" type="video/mp4" />
            {/* Fallback for browsers that don't support video */}
            <div className="w-full h-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400"></div>
          </video>
        </div>

        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Welcome to
              <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                cev meta
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover amazing products with cutting-edge AI technology. 
              Shop smarter, live better.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 text-white">
                <FiStar className="mr-2" />
                <span className="text-sm font-medium">Premium Quality</span>
              </div>
              <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 text-white">
                <FiTrendingUp className="mr-2" />
                <span className="text-sm font-medium">AI Powered</span>
              </div>
              <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 text-white">
                <FiShoppingBag className="mr-2" />
                <span className="text-sm font-medium">Fast Delivery</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group relative px-8 py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                <span className="flex items-center">
                  <FiShoppingBag className="mr-2" />
                  SHOP NOW
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>

              <button className="group flex items-center px-6 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300">
                <FiPlay className="mr-2" />
                Watch Demo
              </button>
            </div>

            {/* Floating Animation Elements */}
            <div className="absolute top-20 left-10 animate-bounce">
              <div className="w-4 h-4 bg-pink-400 rounded-full opacity-60"></div>
            </div>
            <div className="absolute top-40 right-20 animate-pulse">
              <div className="w-6 h-6 bg-purple-400 rounded-full opacity-40"></div>
            </div>
            <div className="absolute bottom-40 left-20 animate-bounce delay-1000">
              <div className="w-3 h-3 bg-indigo-400 rounded-full opacity-50"></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      
<Product/>
     
    </div>
  );
};


export default Home