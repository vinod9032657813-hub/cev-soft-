import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ShopDataContext } from '../context/ShopContext';
import { authdatecontext } from '../context/Authcontext';
import { FiCreditCard, FiTruck, FiShield, FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';

const OrderAll = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { products, currency, cartItems, getCartAmount, clearCart } = useContext(ShopDataContext);
  const { serverurl } = useContext(authdatecontext);
  const [orderForm, setOrderForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'cod'
  });

  const cartData = [];
  
  // Get cart items from location state or from context
  if (location.state?.cartItems) {
    cartData.push(...location.state.cartItems);
  } else {
    // Fallback to context if no state
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
  }

  useEffect(() => {
    if (cartData.length === 0) {
      navigate('/cart');
    }
  }, [cartData, navigate]);

  const handleInputChange = (e) => {
    setOrderForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async (orderData) => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert('Razorpay SDK failed to load. Please check your internet connection.');
      return;
    }

    const options = {
      key: 'rzp_test_YOUR_KEY_ID', // Replace with your Razorpay key
      amount: orderData.amount * 100, // Amount in paise
      currency: 'INR',
      name: 'cev meta',
      description: 'Cart Purchase',
      image: '/logo.png',
      handler: async function (response) {
        console.log('Payment successful:', response);
        
        // Update order with payment details
        orderData.payment = true;
        orderData.razorpayPaymentId = response.razorpay_payment_id;
        
        // Send order to backend
        try {
          const orderResponse = await axios.post(serverurl + '/api/order/place', orderData);
          
          if (orderResponse.data.success) {
            // Clear cart after successful order
            clearCart();
            
            alert('Payment successful! Order placed. 🎉');
            navigate('/');
          }
        } catch (error) {
          console.error('Order placement error:', error);
          alert('Payment successful but order placement failed. Please contact support.');
        }
      },
      prefill: {
        name: orderForm.name,
        email: orderForm.email,
        contact: orderForm.phone
      },
      notes: {
        address: `${orderForm.address}, ${orderForm.city}, ${orderForm.pincode}`
      },
      theme: {
        color: '#9333ea'
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    try {
      // Prepare order data for backend
      const orderData = {
        items: cartData.map(item => {
          const product = products.find(p => p._id === item._id);
          return {
            productId: product._id,
            name: product.name,
            price: product.price,
            image: product.Image1,
            size: item.size,
            quantity: item.quantity,
            category: product.category,
            subcategory: product.subcategory
          };
        }),
        amount: getCartAmount(),
        address: {
          name: orderForm.name,
          email: orderForm.email,
          phone: orderForm.phone,
          street: orderForm.address,
          city: orderForm.city,
          pincode: orderForm.pincode
        },
        paymentMethod: orderForm.paymentMethod
      };

      console.log('Placing cart order:', orderData);
      console.log('Server URL:', serverurl);

      // If online payment, use Razorpay
      if (orderForm.paymentMethod === 'online') {
        await handleRazorpayPayment(orderData);
        return;
      }

      // For COD, proceed with normal order placement
      const response = await axios.post(serverurl + '/api/order/place', orderData);

      console.log('Order response:', response.data);

      if (response.data.success) {
        // Clear cart after successful order
        clearCart();
        
        alert('Order placed successfully! 🎉\nThank you for your purchase!');
        navigate('/');
      } else {
        console.error('Order failed:', response.data.message);
        alert('Failed to place order: ' + response.data.message);
      }
    } catch (error) {
      console.error('Order error:', error);
      console.error('Error response:', error.response?.data);
      alert('Failed to place order. Check console for details.');
    }
  };

  if (cartData.length === 0) {
    return null;
  }

  const totalAmount = getCartAmount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link 
          to="/cart" 
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6 transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Cart</span>
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Complete Your Order
          </h1>
          <p className="text-gray-600">Review your order and provide delivery details</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {cartData.map((item, index) => {
                const productData = products.find((product) => product._id === item._id);
                if (!productData) return null;

                return (
                  <div key={index} className="flex gap-4 pb-4 border-b border-gray-100">
                    <img 
                      src={productData.Image1} 
                      alt={productData.name}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">{productData.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">{productData.description}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs font-semibold rounded-full">
                          {productData.category}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                          Size: {item.size}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                          Qty: {item.quantity}
                        </span>
                      </div>
                      <p className="text-lg font-bold text-purple-600">
                        {currency}{productData.price * item.quantity}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Price Breakdown */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({cartData.length} items)</span>
                <span className="font-semibold">{currency}{totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t pt-2">
                <span>Total</span>
                <span className="text-purple-600">{currency}{totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Order Form */}
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Delivery Information</h2>
            
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={orderForm.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={orderForm.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={orderForm.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                <textarea
                  name="address"
                  value={orderForm.address}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={orderForm.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={orderForm.pincode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Payment Method</label>
                <div className="space-y-2">
                  <label className="flex items-center p-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-purple-300 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={orderForm.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <FiTruck className="w-5 h-5 mr-2 text-green-600" />
                    <span className="font-medium">Cash on Delivery</span>
                  </label>
                  <label className="flex items-center p-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-purple-300 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={orderForm.paymentMethod === 'online'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <FiCreditCard className="w-5 h-5 mr-2 text-blue-600" />
                    <div className="flex-1">
                      <span className="font-medium">Online Payment (Razorpay)</span>
                      <p className="text-xs text-gray-500 mt-0.5">Pay with Card, UPI, Net Banking, Wallets</p>
                    </div>
                  </label>

                  {/* Online Payment Options - Expandable */}
                  {orderForm.paymentMethod === 'online' && (
                    <div className="mt-4 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200 animate-fadeIn">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <FiCreditCard className="w-4 h-4 text-blue-600" />
                        Enter Card Details
                      </h4>
                      
                      {/* Card Payment (Debit/Credit) */}
                      <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Card Number</label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            maxLength="19"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Cardholder Name</label>
                          <input
                            type="text"
                            placeholder="Name on Card"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Expiry Date</label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              maxLength="5"
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">CVV</label>
                            <input
                              type="text"
                              placeholder="123"
                              maxLength="3"
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
                          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                          <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="h-6" />
                          <span className="text-xs text-gray-500 ml-auto">Accepts all major cards</span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-600 mt-3 flex items-center gap-1">
                        <FiShield className="w-3 h-3 text-green-600" />
                        Secured by Razorpay - Your payment information is encrypted
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
                <FiShield className="w-4 h-4 text-green-600" />
                <span>Your information is secure and encrypted</span>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold text-lg rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Place Order - {currency}{totalAmount}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderAll;
