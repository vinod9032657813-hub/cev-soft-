import { useState } from 'react';
import axios from 'axios';

const Add = () => {
  const [images, setImages] = useState([null, null, null, null]);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [price, setPrice] = useState('');
  const [sizes, setSizes] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState([null, null, null, null]);

  const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL'];

  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      // Store the actual file for upload
      const newImageFiles = [...imageFiles];
      newImageFiles[index] = file;
      setImageFiles(newImageFiles);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[index] = reader.result;
        setImages(newImages);
      };                                  
      reader.readAsDataURL(file);
    }
  };

  const toggleSize = (size) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter(s => s !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!productName || !description || !category || !subCategory || !price || sizes.length === 0) {
      alert('Please fill in all required fields and select at least one size');
      return;
    }

    const validImages = imageFiles.filter(file => file !== null);
    if (validImages.length < 4) {
      alert('Please upload all 4 product images');
      return;
    }

    setLoading(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('name', productName);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('subcategory', subCategory);
      formData.append('price', price);
      formData.append('sizes', JSON.stringify(sizes));
      formData.append('bestseller', bestSeller);

      // Add images to FormData
      imageFiles.forEach((file, index) => {
        if (file) {
          formData.append(`image${index + 1}`, file);
        }
      });

      // Send to backend
      const API_URL = import.meta.env.VITE_API_URL || 'https://godbelieve.onrender.com';
      const response = await axios.post(`${API_URL}/api/product/addproduct`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      if (response.data.success) {
        alert('Product added successfully!');
        
        // Reset form
        setImages([null, null, null, null]);
        setImageFiles([null, null, null, null]);
        setProductName('');
        setDescription('');
        setCategory('');
        setSubCategory('');
        setPrice('');
        setSizes([]);
        setBestSeller(false);
      } else {
        alert('Failed to add product: ' + (response.data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-xl">
        <h1 className="text-2xl sm:text-3xl font-bold">Add Product Page</h1>
        <p className="text-purple-100 mt-1 sm:mt-2 text-sm sm:text-base">Create a new product for your store</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        
        {/* Upload Images Section */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Upload Images
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <label className="cursor-pointer block">
                  <div className={`border-2 border-dashed rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 ${
                    image ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-400 bg-gray-50'
                  } h-32 sm:h-40 lg:h-48 flex items-center justify-center`}>
                    {image ? (
                      <img src={image} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center px-2">
                        <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto text-gray-400 group-hover:text-purple-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500">Image {index + 1}</p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(index, e)}
                    className="hidden"
                  />
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div>
          <label className="block text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
            Product Name
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition duration-200 text-sm sm:text-base"
            required
          />
        </div>

        {/* Product Description */}
        <div>
          <label className="block text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
            Product Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            rows="4"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition duration-200 resize-none text-sm sm:text-base"
            required
          />
        </div>

        {/* Category and Sub Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Category */}
          <div>
            <label className="block text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition duration-200 bg-white text-sm sm:text-base"
              required
            >
              <option value="">Select Category</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
              <option value="beauty">Beauty</option>
              <option value="SAI">SAI</option>
            </select>
          </div>

          {/* Sub Category */}
          <div>
            <label className="block text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
              Sub Category
            </label>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition duration-200 bg-white text-sm sm:text-base"
              required
            >
              <option value="">Select Sub Category</option>
              <option value="shirts">Shirts</option>
              <option value="bottoms">Bottoms</option>
              <option value="bra">Bra</option>
              <option value="pants">Pants</option>
              <option value="books">Books</option>
              <option value="dress">Dress</option>
            </select>
          </div>
        </div>

        {/* Product Price */}
        <div>
          <label className="block text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
            Product Price
          </label>
          <div className="relative">
            <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-base sm:text-lg font-semibold">$</span>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              step="0.01"
              className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition duration-200 text-sm sm:text-base"
              required
            />
          </div>
        </div>

        {/* Product Sizes */}
        <div>
          <label className="block text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
            Product Sizes
          </label>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {sizeOptions.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-200 text-sm sm:text-base ${
                  sizes.includes(size)
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          {sizes.length > 0 && (
            <p className="mt-2 text-sm text-purple-600">
              Selected: {sizes.join(', ')}
            </p>
          )}
        </div>

        {/* Best Seller */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 sm:p-6 border-2 border-purple-200">
          <label className="flex items-start sm:items-center cursor-pointer group">
            <div className="relative flex-shrink-0">
              <input
                type="checkbox"
                checked={bestSeller}
                onChange={(e) => setBestSeller(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-12 h-7 sm:w-14 sm:h-8 rounded-full transition-colors duration-300 ${
                bestSeller ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-300'
              }`}></div>
              <div className={`absolute left-1 top-1 w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full transition-transform duration-300 ${
                bestSeller ? 'transform translate-x-5 sm:translate-x-6' : ''
              }`}></div>
            </div>
            <div className="ml-3 sm:ml-4">
              <span className="text-base sm:text-lg font-semibold text-gray-800 block">Add to Best Seller</span>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">Feature this product in the best seller section</p>
            </div>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-base sm:text-lg focus:outline-none focus:ring-4 focus:ring-purple-300 transform transition duration-200 shadow-xl ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:scale-[1.02]'
          }`}
        >
          <span className="flex items-center justify-center">
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding Product...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Product
              </>
            )}
          </span>
        </button>
      </form>
    </div>
  );
};

export default Add;