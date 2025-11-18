import { useContext, useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { ShopDataContext } from '../context/ShopContext';
import { authdatecontext } from '../context/Authcontext';
import { FiCreditCard, FiTruck, FiShield, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Order = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { products, currency, cartItems, updateQuantity } = useContext(ShopDataContext);
  const { serverurl } = useContext(authdatecontext);
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [orderForm, setOrderForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'cod'
  });

  useEffect(() => {
    if (products && id) {
      const foundProduct = products.find(item => item._id === id);
      setProduct(foundProduct);
      
      // Get size and quantity from URL params
      const sizeParam = searchParams.get('size');
      const quantityParam = searchParams.get('quantity');
      
      if (sizeParam) setSelectedSize(sizeParam);
      if (quantityParam) setQuantity(parseInt(quantityParam) || 1);
    }
  }, [products, id, searchParams]);

  const handleInputChange = (e) => {
    setOrderForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
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
      description: 'Product Purchase',
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
            // Remove this product from cart if it exists
            if (cartItems[id] && cartItems[id][selectedSize]) {
              updateQuantity(id, selectedSize, 0);
            }
            
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
    
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    try {
      // Prepare order data for backend
      const orderData = {
        items: [{
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.Image1,
          size: selectedSize,
          quantity: quantity,
          category: product.category,
          subcategory: product.subcategory
        }],
        amount: product.price * quantity,
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

      console.log('Placing order:', orderData);
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
        // Remove this product from cart if it exists
        if (cartItems[id] && cartItems[id][selectedSize]) {
          updateQuantity(id, selectedSize, 0);
        }
        
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

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  const subtotal = product.price * quantity;
  const total = subtotal;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/product" 
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6 transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Products</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Complete Your Order
          </h1>
          <p className="text-gray-600">Review your order and provide delivery details</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Summary */}
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
            
            {/* Product Images Gallery */}
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <img 
                  src={product.Image1} 
                  alt={`${product.name} - Image 1`}
                  onClick={() => handleImageClick(product.Image1)}
                  className="w-full h-40 object-cover rounded-xl hover:scale-105 transition-transform duration-300 cursor-zoom-in"
                />
                <img 
                  src={product.Image2} 
                  alt={`${product.name} - Image 2`}
                  onClick={() => handleImageClick(product.Image2)}
                  className="w-full h-40 object-cover rounded-xl hover:scale-105 transition-transform duration-300 cursor-zoom-in"
                />
                <img 
                  src={product.Image3} 
                  alt={`${product.name} - Image 3`}
                  onClick={() => handleImageClick(product.Image3)}
                  className="w-full h-40 object-cover rounded-xl hover:scale-105 transition-transform duration-300 cursor-zoom-in"
                />
                <img 
                  src={product.Image4} 
                  alt={`${product.name} - Image 4`}
                  onClick={() => handleImageClick(product.Image4)}
                  className="w-full h-40 object-cover rounded-xl hover:scale-105 transition-transform duration-300 cursor-zoom-in"
                />
              </div>
            </div>

            {/* Fullscreen Image Modal with Zoom */}
            {selectedImage && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedImage(null)}
              >
                <button
                  className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10"
                  onClick={() => setSelectedImage(null)}
                >
                  ×
                </button>
                <div 
                  className="relative w-full h-full flex items-center justify-center overflow-hidden"
                  onMouseMove={handleMouseMove}
                  onClick={(e) => e.stopPropagation()}
                >
                  <img 
                    src={selectedImage} 
                    alt="Product view"
                    className="max-w-full max-h-full object-contain"
                    style={{
                      transform: `scale(2)`,
                      transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                      transition: 'transform-origin 0.1s ease-out'
                    }}
                  />
                </div>
                <p className="absolute bottom-4 text-white text-sm">Click anywhere to close | Move mouse to zoom</p>
              </div>
            )}

            {/* Product Details */}
            <div className="mb-6">
              <h3 className="font-bold text-xl text-gray-800 mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{product.description}</p>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-purple-100 text-purple-600 text-xs font-semibold rounded-full">
                  {product.category}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                  {product.subcategory}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                  Size: {selectedSize || 'Not selected'}
                </span>
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <p className="font-semibold text-gray-700 mb-3">Select Size:</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg border-2 font-bold text-sm transition-all ${
                      selectedSize === size
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-purple-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p className="font-semibold text-gray-700 mb-3">Quantity:</p>
              <input
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-20 px-3 py-2 border-2 border-gray-200 rounded-lg text-center font-bold focus:border-purple-400 focus:outline-none"
              />
            </div>

            {/* Price Breakdown */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Price per item</span>
                <span className="font-semibold">{currency}{product.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Quantity</span>
                <span className="font-semibold">{quantity} item{quantity > 1 ? 's' : ''}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total Amount</span>
                <span className="text-purple-600">{currency}{total}</span>
              </div>
            </div>
          </div>

          {/* Order Form */}
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Delivery Information</h2>
            
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <div className="mt-4 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <FiCreditCard className="w-4 h-4 text-blue-600" />
                        Choose Payment Method
                      </h4>
                      
                      <div className="space-y-3">
                        {/* UPI Payment */}
                        <div className="bg-white p-3 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                              UPI
                            </div>
                            <span className="font-semibold text-sm">UPI Payment</span>
                          </div>
                          <input
                            type="text"
                            placeholder="Enter UPI ID (e.g., name@paytm)"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>

                        {/* Card Payment */}
                        <div className="bg-white p-3 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
                          <div className="flex items-center gap-2 mb-2">
                            <FiCreditCard className="w-8 h-8 text-blue-600" />
                            <span className="font-semibold text-sm">Debit / Credit Card</span>
                          </div>
                          <div className="space-y-2">
                            <input
                              type="text"
                              placeholder="Card Number"
                              maxLength="19"
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                              type="text"
                              placeholder="Cardholder Name"
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                placeholder="MM/YY"
                                maxLength="5"
                                className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                              />
                              <input
                                type="text"
                                placeholder="CVV"
                                maxLength="3"
                                className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                              />
                            </div>
                            <div className="flex items-center gap-2 pt-1">
                              <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-5" />
                              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" />
                              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="h-5" />
                            </div>
                          </div>
                        </div>

                        {/* Net Banking */}
                        <div className="bg-white p-3 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                              🏦
                            </div>
                            <span className="font-semibold text-sm">Net Banking</span>
                          </div>
                          <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                            <option value="">Select Your Bank</option>
                            <option value="sbi">State Bank of India</option>
                            <option value="hdfc">HDFC Bank</option>
                            <option value="icici">ICICI Bank</option>
                            <option value="axis">Axis Bank</option>
                            <option value="pnb">Punjab National Bank</option>
                            <option value="kotak">Kotak Mahindra Bank</option>
                            <option value="other">Other Banks</option>
                          </select>
                        </div>

                        {/* EMI Options */}
                        <div className="bg-white p-3 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                              EMI
                            </div>
                            <span className="font-semibold text-sm">EMI (Easy Installments)</span>
                          </div>
                          <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2">
                            <option value="">Select EMI Plan</option>
                            <option value="3">3 Months - No Cost EMI</option>
                            <option value="6">6 Months - ₹{Math.round((product.price * quantity) / 6)}/month</option>
                            <option value="9">9 Months - ₹{Math.round((product.price * quantity) / 9)}/month</option>
                            <option value="12">12 Months - ₹{Math.round((product.price * quantity) / 12)}/month</option>
                          </select>
                          <p className="text-xs text-gray-500">Available on orders above ₹3,000</p>
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
                Place Order - {currency}{total}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;