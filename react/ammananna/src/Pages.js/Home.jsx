import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopDataContext } from '../context/ShopContext';
import { FiShoppingCart, FiTruck, FiShield, FiPercent, FiArrowRight } from 'react-icons/fi';

const Home = () => {
  const { products, currency, addToCart } = useContext(ShopDataContext);

  // Get categories
  const categories = [...new Set(products.map(p => p.category))];
  
  // Get featured products (first 4)
  const featuredProducts = products.slice(0, 4);
  
  // Get deals (products with bestseller tag)
  const deals = products.filter(p => p.bestseller).slice(0, 6);

  return (
    <div className="bg-gray-100 min-h-screen">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to Amma Nanna
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Your one-stop shop for everything you need
            </p>
            <Link to="/collection">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-all inline-flex items-center gap-2">
                Shop Now <FiArrowRight />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <FiTruck className="w-8 h-8 text-blue-600" />
              <div>
                <p className="font-semibold text-gray-900">Free Delivery</p>
                <p className="text-sm text-gray-600">On orders over {currency}500</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <FiShield className="w-8 h-8 text-green-600" />
              <div>
                <p className="font-semibold text-gray-900">Secure Payment</p>
                <p className="text-sm text-gray-600">100% secure transactions</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <FiPercent className="w-8 h-8 text-orange-600" />
              <div>
                <p className="font-semibold text-gray-900">Great Deals</p>
                <p className="text-sm text-gray-600">Best prices guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link key={index} to={`/collection?category=${category}`}>
                <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer border">
                  <div className="text-4xl mb-2">
                    {category === 'men' && '👔'}
                    {category === 'women' && '👗'}
                    {category === 'kids' && '👶'}
                    {category === 'beauty' && '💄'}
                    {category === 'SAI' && '🙏'}
                    {!['men', 'women', 'kids', 'beauty', 'SAI'].includes(category) && '🛍️'}
                  </div>
                  <p className="font-semibold text-gray-900 capitalize">{category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Today's Deals */}
        {deals.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Today's Deals</h2>
              <Link to="/collection" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1">
                See all <FiArrowRight />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {deals.map((product) => (
                <Link key={product._id} to={`/product/${product._id}`}>
                  <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow border">
                    <div className="relative">
                      <img 
                        src={product.Image1} 
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                        Deal
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-sm text-gray-900 font-medium line-clamp-2 mb-1">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">
                          {currency}{product.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Featured Products */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product._id} className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow border">
                <Link to={`/product/${product._id}`}>
                  <img 
                    src={product.Image1} 
                    alt={product.name}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform"
                  />
                </Link>
                <div className="p-4">
                  <Link to={`/product/${product._id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                      {currency}{product.price}
                    </span>
                    <Link to={`/product/${product._id}`}>
                      <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-full font-semibold text-sm transition-colors flex items-center gap-2">
                        <FiShoppingCart /> Add
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Products Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">All Products</h2>
            <Link to="/collection" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1">
              View all <FiArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {products.slice(0, 10).map((product) => (
              <Link key={product._id} to={`/product/${product._id}`}>
                <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow border">
                  <img 
                    src={product.Image1} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3">
                    <p className="text-sm text-gray-900 font-medium line-clamp-2 mb-2">
                      {product.name}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">
                        {currency}{product.price}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-600 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Sign up and get exclusive deals
          </h2>
          <p className="text-xl mb-6 text-orange-100">
            Join thousands of happy customers
          </p>
          <Link to="/collection">
            <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-all">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
