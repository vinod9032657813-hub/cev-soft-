import { useContext, useState, useEffect } from 'react';
import { ShopDataContext } from '../context/ShopContext';
import { useNavigate, Link } from 'react-router-dom';
import { FiCreditCard, FiTruck, FiArrowLeft } from 'react-icons/fi';

const Checkout = () => {
  const navigate = useNavigate();
  const { products, cartItems, currency, getCartAmount } = useContext(ShopDataContext);
  const [orderForm, setOrderForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Load Razorpay script dynamically
  useEffect(() => {
    const loadRazorpay = () => {
      if (typeof window.Razorpay !== 'undefined') {
        setRazorpayLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        setRazorpayLoaded(true);
        console.log('Razorpay loaded successfully');
      };
      script.onerror = () => {
        console.error('Failed to load Razorpay');
        setRazorpayLoaded(false);
      };
      document.body.appendChild(script);
    };

    loadRazorpay();
  }, []);

  const cartData = [];
  
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

  const handleInputChange = (e) => {
    setOrderForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRazorpayPayment = () => {
    const totalAmount = getCartAmount();

    if (!razorpayLoaded || typeof window.Razorpay === 'undefined') {
      alert('Razorpay is loading... Please try again in a moment.');
      setIsProcessing(false);
      return;
    }

    // Ensure amount is valid
    const amountInPaise = Math.round(totalAmount * 100);
    console.log('Total Amount:', totalAmount, 'Amount in Paise:', amountInPaise);

    if (amountInPaise <= 0) {
      alert('Invalid amount. Please check your cart.');
      setIsProcessing(false);
      return;
    }
    
    const options = {
      key: 'rzp_test_YOUR_KEY_ID', // ⚠️ IMPORTANT: Replace with YOUR Razorpay Key ID from https://dashboard.razorpay.com/app/keys
      amount: amountInPaise, // Amount in paise
      currency: 'INR',
      name: 'Cen Meta',
      description: 'Order Payment',
      image: '/logo.png',
      handler: function (response) {
        // Payment successful callback
        console.log('✅ Payment Success:', response);
        alert(`Payment Successful! 🎉\n\nPayment ID: ${response.razorpay_payment_id}\n\nThank you for your purchase!`);
        setIsProcessing(false);
        navigate('/');
      },
      prefill: {
        name: `${orderForm.firstName} ${orderForm.lastName}`,
        email: orderForm.email,
        contact: orderForm.phone
      },
      notes: {
        address: `${orderForm.address}, ${orderForm.city}, ${orderForm.state}, ${orderForm.pincode}`
      },
      theme: {
        color: '#9333ea'
      },
      modal: {
        ondismiss: function() {
          console.log('❌ Payment cancelled by user');
          setIsProcessing(false);
        }
      }
    };

    console.log('Razorpay Options:', options);

    try {
      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', function (response) {
        console.error('❌ Payment Failed:', response.error);
        const errorMsg = response.error?.description || response.error?.reason || 'Unknown error';
        alert(`Payment Failed!\n\nError: ${errorMsg}\n\nPlease try again or contact support.`);
        setIsProcessing(false);
      });

      rzp.open();
      console.log('Razorpay modal opened');
    } catch (error) {
      console.error('❌ Razorpay Error:', error);
      alert(`Error: ${error.message}\n\nPlease check your Razorpay Key ID or try again.`);
      setIsProcessing(false);
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // If payment method is Razorpay
    if (orderForm.paymentMethod === 'razorpay') {
      handleRazorpayPayment();
    } else {
      // Cash on Delivery or other payment methods
      setTimeout(() => {
        alert('Order placed successfully! 🎉');
        setIsProcessing(false);
        navigate('/');
      }, 2000);
    }
  };

  if (cartData.length === 0) {
    navigate('/cart');
    return null;
  }

  const totalAmount = getCartAmount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Link to="/cart" className="inline-flex items-center gap-2 text-purple-600 mb-6">
          <FiArrowLeft />
          Back to Cart
        </Link>

        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              <div className="bg-white rounded-3xl shadow-xl p-6">
                <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={orderForm.firstName}
                    onChange={handleInputChange}
                    className="px-4 py-3 border-2 rounded-xl focus:border-purple-400 outline-none"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={orderForm.lastName}
                    onChange={handleInputChange}
                    className="px-4 py-3 border-2 rounded-xl focus:border-purple-400 outline-none"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={orderForm.email}
                    onChange={handleInputChange}
                    className="px-4 py-3 border-2 rounded-xl focus:border-purple-400 outline-none"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={orderForm.phone}
                    onChange={handleInputChange}
                    className="px-4 py-3 border-2 rounded-xl focus:border-purple-400 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-xl p-6">
                <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
                <div className="space-y-4">
                  <textarea
                    name="address"
                    placeholder="Street Address"
                    value={orderForm.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border-2 rounded-xl focus:border-purple-400 outline-none"
                    required
                  />
                  <div className="grid md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={orderForm.city}
                      onChange={handleInputChange}
                      className="px-4 py-3 border-2 rounded-xl focus:border-purple-400 outline-none"
                      required
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={orderForm.state}
                      onChange={handleInputChange}
                      className="px-4 py-3 border-2 rounded-xl focus:border-purple-400 outline-none"
                      required
                    />
                    <input
                      type="text"
                      name="pincode"
                      placeholder="Pincode"
                      value={orderForm.pincode}
                      onChange={handleInputChange}
                      className="px-4 py-3 border-2 rounded-xl focus:border-purple-400 outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-xl p-6">
                <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border-2 rounded-xl cursor-pointer hover:border-green-400 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={orderForm.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="mr-4"
                    />
                    <FiTruck className="w-6 h-6 mr-3 text-green-600" />
                    <span className="font-semibold">Cash on Delivery</span>
                  </label>
                  <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer hover:border-purple-400 transition-colors ${!razorpayLoaded ? 'opacity-50' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="razorpay"
                      checked={orderForm.paymentMethod === 'razorpay'}
                      onChange={handleInputChange}
                      className="mr-4"
                      disabled={!razorpayLoaded}
                    />
                    <FiCreditCard className="w-6 h-6 mr-3 text-purple-600" />
                    <div>
                      <span className="font-semibold">Razorpay</span>
                      <p className="text-xs text-gray-500">
                        {razorpayLoaded ? 'UPI, Cards, Wallets & More' : 'Loading...'}
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-xl hover:shadow-xl disabled:bg-gray-400 transition-all"
              >
                {isProcessing 
                  ? 'Processing...' 
                  : orderForm.paymentMethod === 'razorpay' 
                    ? `Pay ${currency}${totalAmount} with Razorpay`
                    : `Place Order - ${currency}${totalAmount}`
                }
              </button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-8">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {cartData.map((item, index) => {
                  const productData = products.find((p) => p._id === item._id);
                  if (!productData) return null;
                  return (
                    <div key={index} className="flex gap-3">
                      <img src={productData.Image1} alt={productData.name} className="w-16 h-16 rounded-lg" />
                      <div>
                        <p className="font-semibold text-sm">{productData.name}</p>
                        <p className="text-xs text-gray-600">Size: {item.size} | Qty: {item.quantity}</p>
                        <p className="text-sm font-bold text-purple-600">{currency}{productData.price * item.quantity}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-purple-600">{currency}{totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
