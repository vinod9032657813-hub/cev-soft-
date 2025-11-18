import { useContext } from 'react';
import { ShopDataContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';

const Cart = () => {
  const { products, cartItems, currency, updateQuantity, getCartAmount, getCartCount } = useContext(ShopDataContext);

  const cartData = [];
  
  // Convert cartItems object to array for easier rendering
  for (const items in cartItems) {
    for (const item in cartItems[items]) {
      if (cartItems[items][item] > 0) {
        cartData.push({
          _id: items,
          size: item,
          quantity: cartItems[items][item]
        });
      }
    }
  }

  if (cartData.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link 
            to="/product" 
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6 transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span className="font-medium">Continue Shopping</span>
          </Link>

          {/* Empty Cart */}
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-white rounded-3xl shadow-xl">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                <FiShoppingBag className="w-12 h-12 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
              <p className="text-gray-600 mb-6">Add some products to get started!</p>
              <Link
                to="/product"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <FiShoppingBag className="w-5 h-5" />
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/product" 
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6 transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
          <span className="font-medium">Continue Shopping</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">{getCartCount()} item{getCartCount() !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);
              
              if (!productData) return null;

              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img 
                        src={productData.Image1} 
                        alt={productData.name}
                        className="w-24 h-24 object-cover rounded-xl"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg text-gray-800">{productData.name}</h3>
                        <button
                          onClick={() => updateQuantity(item._id, item.size, 0)}
                          className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-2">{productData.description}</p>
                      
                      <div className="flex items-center gap-4 mb-3">
                        <span className="px-3 py-1 bg-purple-100 text-purple-600 text-sm font-semibold rounded-full">
                          {productData.category}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-semibold rounded-full">
                          Size: {item.size}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                          >
                            <FiMinus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-600 flex items-center justify-center transition-colors"
                          >
                            <FiPlus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-sm text-gray-500">
                            {currency}{productData.price} × {item.quantity}
                          </p>
                          <p className="text-xl font-bold text-purple-600">
                            {currency}{productData.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({getCartCount()} items)</span>
                  <span className="font-semibold">{currency}{getCartAmount()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-purple-600">{currency}{getCartAmount()}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/order-all"
                state={{ cartItems: cartData }}
                className="block w-full py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold text-lg rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 mb-4 text-center"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/product"
                className="block w-full py-3 text-center border-2 border-purple-600 text-purple-600 font-bold rounded-xl hover:bg-purple-50 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;