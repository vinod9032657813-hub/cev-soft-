import { useContext, useEffect, useState } from 'react';
import Titls from '../Component.js/Titls';
import { ShopDataContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiStar, FiTrendingUp, FiCreditCard, FiX, FiSearch } from 'react-icons/fi';

const Product = () => {
  const { products, addToCart, search, searchResults, setSearchResults } = useContext(ShopDataContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [quantities, setQuantities] = useState({});
  const [displayProducts, setDisplayProducts] = useState([]);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [localSearch, setLocalSearch] = useState('');

  useEffect(() => {
    // Get all products or search results
    if (products && products.length > 0) {
      const productsToShow = searchResults.length > 0 ? searchResults : products;
      setLatestProducts(productsToShow);
      setDisplayProducts(productsToShow);
      
      // Initialize quantities to 1 for each product
      const initialQuantities = {};
      productsToShow.forEach(product => {
        initialQuantities[product._id] = 1;
      });
      setQuantities(initialQuantities);
    }
  }, [products, searchResults]);

  const clearSearch = () => {
    setSearchResults([]);
    setLocalSearch('');
    const productsToShow = products;
    setLatestProducts(productsToShow);
    setDisplayProducts(productsToShow);
  };

  const handleLocalSearch = (e) => {
    e.preventDefault();
    if (localSearch.trim()) {
      const results = searchProducts(localSearch);
      setDisplayProducts(results);
    }
  };

  // Filter products based on local search
  useEffect(() => {
    if (localSearch.trim()) {
      const query = localSearch.toLowerCase();
      const filtered = latestProducts.filter(product => {
        return (
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.subcategory.toLowerCase().includes(query) ||
          (product.description && product.description.toLowerCase().includes(query))
        );
      });
      setDisplayProducts(filtered);
    } else {
      setDisplayProducts(latestProducts);
    }
  }, [localSearch, latestProducts]);

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  const handleQuantityChange = (productId, quantity) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, parseInt(quantity) || 1)
    }));
  };

  const handleAddToCart = (e, productId) => {
    e.preventDefault();
    const selectedSize = selectedSizes[productId];
    const quantity = quantities[productId] || 1;
    
    // Add multiple items based on quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(productId, selectedSize);
    }
  };

  const openFullscreen = (imageSrc) => {
    setFullscreenImage(imageSrc);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <Titls text1={search || localSearch ? "SEARCH" : "LATEST"} text2={search || localSearch ? "RESULTS" : "COLLECTION"} />
          </div>
          {search ? (
            <>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Search Results for "{search}"
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
                Found {searchResults.length} product{searchResults.length !== 1 ? 's' : ''} matching your search
              </p>
              <button
                onClick={clearSearch}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                Clear Search & Show All Products
              </button>
            </>
          ) : (
            <>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Discover Amazing Products
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                Step into style with our new collection dropping this season ✨
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <form onSubmit={handleLocalSearch} className="relative">
                  <div className="relative group">
                    <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-600 transition-colors" />
                    <input
                      type="text"
                      value={localSearch}
                      onChange={(e) => setLocalSearch(e.target.value)}
                      placeholder="Search products by name, category, or description..."
                      className="w-full pl-14 pr-14 py-4 text-gray-800 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-400 placeholder-gray-400 shadow-lg transition-all"
                    />
                    {localSearch && (
                      <button
                        type="button"
                        onClick={() => setLocalSearch('')}
                        className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <FiX className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  {localSearch && (
                    <div className="mt-3 text-sm text-gray-600">
                      Showing {displayProducts.length} of {latestProducts.length} products
                    </div>
                  )}
                </form>
              </div>
            </>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayProducts.length > 0 ? (
            displayProducts.map((item, index) => (
              <div
                key={item._id}
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                
                <div className="relative bg-white rounded-3xl overflow-hidden">
                  {/* Bestseller Badge */}
                  {item.bestseller && (
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      <FiStar className="fill-current" />
                      <span>Bestseller</span>
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:bg-gradient-to-r hover:from-pink-500 hover:to-red-500 hover:text-white transition-all duration-300 group/heart">
                    <FiHeart className="w-5 h-5 group-hover/heart:scale-110 transition-transform" />
                  </button>

                  {/* Product Image with Overlay */}
                  <div className="block relative overflow-hidden cursor-zoom-in" onClick={() => openFullscreen(item.Image1)}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                    <img
                      src={item.Image1}
                      alt={item.name}
                      className="w-full h-40 sm:h-44 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                      <span className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        Click to Zoom
                      </span>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-2 sm:p-3">
                    {/* Category Badges */}
                    <div className="flex items-center justify-center gap-1.5 mb-2">
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 text-xs font-bold text-purple-600 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
                        <FiTrendingUp className="w-2.5 h-2.5" />
                        {item.category}
                      </span>
                      {item.subcategory && (
                        <span className="px-2 py-0.5 text-xs font-semibold text-gray-600 bg-gray-100 rounded-full">
                          {item.subcategory}
                        </span>
                      )}
                    </div>

                    {/* Product Name */}
                    <Link to={`/product/${item._id}`}>
                      <h3 className="text-sm sm:text-base font-extrabold text-gray-800 mb-1.5 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 hover:bg-clip-text transition-all duration-300 line-clamp-1 text-center leading-tight tracking-tight">
                        {item.name}
                      </h3>
                    </Link>

                    {/* Description */}
                    <p className="text-xs text-gray-500 mb-2 line-clamp-2 leading-snug text-center px-1 font-medium">
                      {item.description}
                    </p>

                    {/* Sizes */}
                    {item.sizes && item.sizes.length > 0 && (
                      <div className="mb-2">
                        <p className="text-xs font-semibold text-gray-500 mb-1.5 flex items-center justify-center gap-1">
                          <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
                          Select Size
                        </p>
                        <div className="flex flex-wrap justify-center gap-1.5">
                          {item.sizes.map((size, index) => (
                            <button
                              key={index}
                              onClick={() => handleSizeSelect(item._id, size)}
                              className={`inline-flex items-center justify-center w-8 h-8 text-xs font-bold rounded-lg border-2 transition-all duration-300 ${
                                selectedSizes[item._id] === size
                                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-purple-600 scale-110'
                                  : 'text-gray-700 bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 hover:border-purple-400 hover:text-purple-600'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Price and Add to Cart */}
                    <div className="pt-2 border-t border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-xs text-gray-500">Price</p>
                          <p className="text-xl sm:text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            ₹{item.price}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Total</p>
                          <p className="text-sm font-bold text-gray-800">
                            ₹{item.price * (quantities[item._id] || 1)}
                          </p>
                        </div>
                      </div>

                      {/* Quantity Input and Buttons */}
                      <div className="space-y-2">
                        {/* Quantity Input Box */}
                        <Link 
                          to={`/product/${item._id}`}
                          className="block group/input"
                        >
                          <div className="relative">
                            <input
                              type="number"
                              min="1"
                              max="99"
                              value={quantities[item._id] || 1}
                              onChange={(e) => {
                                e.preventDefault();
                                handleQuantityChange(item._id, e.target.value);
                              }}
                              onClick={(e) => e.preventDefault()}
                              className="w-full px-3 py-2 bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 rounded-lg text-center font-bold text-gray-800 text-sm focus:outline-none focus:border-purple-400 focus:bg-white transition-all duration-300 group-hover/input:border-purple-300 group-hover/input:shadow-md"
                              placeholder="Qty"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg opacity-0 group-hover/input:opacity-50 transition-opacity duration-300 pointer-events-none"></div>
                          </div>
                        </Link>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-1.5">
                          {/* Add to Cart Button */}
                          <button
                            onClick={(e) => handleAddToCart(e, item._id)}
                            className="group/btn relative px-2.5 py-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
                          >
                            <span className="relative z-10 flex items-center justify-center gap-0.5">
                              <FiShoppingCart className="w-3 h-3" />
                              <span className="text-xs">Add</span>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                          </button>

                          {/* Buy Now Button - Wider */}
                          <Link
                            to={`/order/${item._id}?size=${selectedSizes[item._id] || ''}&quantity=${quantities[item._id] || 1}`}
                            className="group/buy relative flex-1 px-3 py-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white font-bold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 block"
                          >
                            <span className="relative z-10 flex items-center justify-center gap-0.5">
                              <FiCreditCard className="w-3 h-3" />
                              <span className="text-xs">Buy Now</span>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-green-600 to-emerald-600 opacity-0 group-hover/buy:opacity-100 transition-opacity duration-300"></div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="inline-block p-8 bg-white rounded-3xl shadow-xl">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                  <FiShoppingCart className="w-12 h-12 text-purple-600" />
                </div>
                {search ? (
                  <>
                    <p className="text-2xl font-bold text-gray-800 mb-2">No products found</p>
                    <p className="text-gray-500 mb-4">No products match your search "{search}"</p>
                    <button
                      onClick={clearSearch}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                      Clear Search
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-2xl font-bold text-gray-800 mb-2">No products available yet</p>
                    <p className="text-gray-500">Check back soon for new arrivals! ✨</p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Image Viewer with Zoom */}
      {fullscreenImage && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center cursor-pointer"
          onClick={closeFullscreen}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 text-white text-4xl hover:text-gray-300 transition-colors z-50 bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70"
            onClick={closeFullscreen}
          >
            <FiX />
          </button>

          {/* Instructions */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-6 py-3 rounded-full">
            Click anywhere to close | Move mouse to zoom
          </div>

          {/* Zoomed Image */}
          <div 
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            onMouseMove={handleMouseMove}
          >
            <img
              src={fullscreenImage}
              alt="Fullscreen view"
              className="max-w-full max-h-full object-contain"
              style={{
                transform: 'scale(2)',
                transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                transition: 'transform-origin 0.1s ease-out'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;