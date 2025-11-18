import { useContext, useState, useEffect } from 'react';
import { ShopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { FiFilter, FiX, FiShoppingCart } from 'react-icons/fi';

const Collection = () => {
  const { products, currency, addToCart } = useContext(ShopDataContext);
  const navigate = useNavigate();
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Get unique categories and subcategories
  const categories = [...new Set(products.map(p => p.category))].filter(Boolean);
  const subcategories = [...new Set(products.map(p => p.subcategory))].filter(Boolean);

  // Filter products based on selections
  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    // Filter by subcategory
    if (selectedSubcategories.length > 0) {
      filtered = filtered.filter(p => selectedSubcategories.includes(p.subcategory));
    }

    // Filter by price range
    if (priceRange !== 'all') {
      filtered = filtered.filter(p => {
        const price = p.price;
        switch(priceRange) {
          case 'under500': return price < 500;
          case '500-1000': return price >= 500 && price <= 1000;
          case '1000-2000': return price >= 1000 && price <= 2000;
          case 'above2000': return price > 2000;
          default: return true;
        }
      });
    }

    // Sort products
    if (sortBy === 'low-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high-low') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategories, selectedSubcategories, priceRange, sortBy]);

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategories(prev => 
      prev.includes(subcategory) 
        ? prev.filter(s => s !== subcategory)
        : [...prev, subcategory]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    setPriceRange('all');
    setSortBy('default');
  };

  const FilterSection = () => (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Filters
        </h2>
        {(selectedCategories.length > 0 || selectedSubcategories.length > 0 || priceRange !== 'all') && (
          <button 
            onClick={clearFilters}
            className="text-sm text-red-500 hover:text-red-600 font-semibold"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <h3 className="font-bold text-gray-800 mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map(category => (
              <label key={category} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                />
                <span className="text-gray-700 group-hover:text-purple-600 transition-colors">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Subcategories */}
      {subcategories.length > 0 && (
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <h3 className="font-bold text-gray-800 mb-3">Subcategories</h3>
          <div className="space-y-2">
            {subcategories.map(subcategory => (
              <label key={subcategory} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedSubcategories.includes(subcategory)}
                  onChange={() => handleSubcategoryChange(subcategory)}
                  className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                />
                <span className="text-gray-700 group-hover:text-purple-600 transition-colors">
                  {subcategory}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div className="bg-white rounded-2xl p-4 shadow-md">
        <h3 className="font-bold text-gray-800 mb-3">Price Range</h3>
        <div className="space-y-2">
          {[
            { value: 'all', label: 'All Prices' },
            { value: 'under500', label: 'Under ₹500' },
            { value: '500-1000', label: '₹500 - ₹1000' },
            { value: '1000-2000', label: '₹1000 - ₹2000' },
            { value: 'above2000', label: 'Above ₹2000' }
          ].map(option => (
            <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="priceRange"
                value={option.value}
                checked={priceRange === option.value}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-4 h-4 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-gray-700 group-hover:text-purple-600 transition-colors">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Our Collection
          </h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Discover our amazing products. Filter by category, price, and more to find exactly what you need.
          </p>
        </div>

        <div className="flex gap-6">
          {/* Desktop Filters - Left Sidebar */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSection />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="bg-white rounded-2xl shadow-md p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setShowMobileFilter(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                >
                  <FiFilter />
                  Filters
                </button>
                
                <p className="text-gray-600">
                  <span className="font-bold text-purple-600">{filteredProducts.length}</span> Products Found
                </p>
              </div>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-purple-400 outline-none"
              >
                <option value="default">Sort By: Default</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <div
                    key={product._id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                  >
                    <div 
                      className="relative overflow-hidden cursor-pointer"
                      onClick={() => navigate(`/product/${product._id}`)}
                    >
                      <img
                        src={product.Image1}
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {product.bestseller && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          ⭐ Bestseller
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 
                        className="font-bold text-lg text-gray-800 mb-2 cursor-pointer hover:text-purple-600 transition-colors line-clamp-2"
                        onClick={() => navigate(`/product/${product._id}`)}
                      >
                        {product.name}
                      </h3>
                      
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl font-bold text-purple-600">
                          {currency}{product.price}
                        </span>
                        {product.category && (
                          <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                            {product.category}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => navigate(`/product/${product._id}`)}
                        className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <FiShoppingCart />
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No Products Found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Modal */}
        {showMobileFilter && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
            <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-purple-600">Filters</h2>
                  <button
                    onClick={() => setShowMobileFilter(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <FiX size={24} />
                  </button>
                </div>
                <FilterSection />
                <button
                  onClick={() => setShowMobileFilter(false)}
                  className="w-full mt-6 py-3 bg-purple-600 text-white rounded-xl font-semibold"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;