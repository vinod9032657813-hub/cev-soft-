import { useContext, useEffect, useState } from 'react';
import { authdatecontext } from '../context/Authcontext';
import axios from 'axios';
import { FiPackage, FiRefreshCw, FiClock, FiTruck, FiCheckCircle, FiXCircle, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const MyOrders = () => {
  const { serverurl } = useContext(authdatecontext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(serverurl + '/api/order/all');
      
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'order placed':
        return <FiClock className="w-5 h-5" />;
      case 'processing':
        return <FiPackage className="w-5 h-5" />;
      case 'shipped':
        return <FiTruck className="w-5 h-5" />;
      case 'delivered':
        return <FiCheckCircle className="w-5 h-5" />;
      case 'cancelled':
        return <FiXCircle className="w-5 h-5" />;
      default:
        return <FiPackage className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'order placed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  // Filter by status
  const statusFilteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status.toLowerCase() === filter.toLowerCase());

  // Filter by search query
  const filteredOrders = statusFilteredOrders.filter(order => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    
    // Search in order ID
    if (order._id.toLowerCase().includes(query)) return true;
    
    // Search in product names
    const hasMatchingProduct = order.items.some(item => 
      item.name.toLowerCase().includes(query)
    );
    if (hasMatchingProduct) return true;
    
    // Search in customer name
    if (order.address.name.toLowerCase().includes(query)) return true;
    
    // Search in city
    if (order.address.city.toLowerCase().includes(query)) return true;
    
    return false;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl p-8 text-white shadow-2xl mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">My Orders</h1>
              <p className="text-purple-100">Track your order status and delivery</p>
              <p className="text-purple-200 text-sm mt-1">
                Total: {orders.length} | Showing: {filteredOrders.length}
              </p>
            </div>
            <button
              onClick={fetchOrders}
              className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors flex items-center gap-2 shadow-lg"
            >
              <FiRefreshCw className="w-5 h-5" />
              Refresh
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by order ID, product name, or city..."
              className="w-full pl-12 pr-12 py-3 text-gray-800 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 placeholder-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {['all', 'order placed', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  filter === status
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            {searchQuery ? (
              <>
                <FiSearch className="w-20 h-20 mx-auto mb-4 text-gray-400" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Results Found</h3>
                <p className="text-gray-600 mb-6">
                  No orders match your search: "{searchQuery}"
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Clear Search
                </button>
              </>
            ) : (
              <>
                <FiPackage className="w-20 h-20 mx-auto mb-4 text-gray-400" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Orders Found</h3>
                <p className="text-gray-600 mb-6">
                  {filter === 'all' 
                    ? "You haven't placed any orders yet." 
                    : `No orders with status "${filter}"`}
                </p>
                <Link
                  to="/product"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Start Shopping
                </Link>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div key={order._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                {/* Order Header */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Order ID</p>
                      <p className="text-lg font-bold text-gray-800">#{order._id.slice(-8).toUpperCase()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Order Date</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {new Date(order.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="font-bold">{order.status}</span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <h3 className="font-bold text-gray-800 mb-4 text-lg">Order Items</h3>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-20 h-20 object-cover rounded-lg shadow-md"
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800">{item.name}</h4>
                          <p className="text-sm text-gray-600">
                            Size: <span className="font-semibold">{item.size}</span> | 
                            Qty: <span className="font-semibold">{item.quantity}</span>
                          </p>
                          <p className="text-sm text-gray-500">{item.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Price</p>
                          <p className="text-lg font-bold text-purple-600">₹{item.price * item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-t">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <FiTruck className="w-5 h-5 text-purple-600" />
                        Delivery Address
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        <span className="font-semibold">{order.address.name}</span><br />
                        {order.address.street}<br />
                        {order.address.city}, {order.address.pincode}<br />
                        <span className="text-gray-600">Phone: {order.address.phone}</span>
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-3">Payment Details</h4>
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Method:</span> {order.paymentmethod}<br />
                        <span className="font-semibold">Status:</span> {order.payment ? 'Paid' : 'Pending'}<br />
                        <span className="text-2xl font-bold text-purple-600 mt-2 block">Total: ₹{order.amount}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Timeline */}
                <div className="p-6 bg-white border-t">
                  <h4 className="font-bold text-gray-800 mb-4">Order Timeline</h4>
                  <div className="flex items-center justify-between">
                    {['Order Placed', 'Processing', 'Shipped', 'Delivered'].map((step, index) => {
                      const isActive = ['order placed', 'processing', 'shipped', 'delivered']
                        .indexOf(order.status.toLowerCase()) >= index;
                      return (
                        <div key={step} className="flex items-center">
                          <div className={`flex flex-col items-center ${index > 0 ? 'ml-4' : ''}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              isActive 
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                                : 'bg-gray-200 text-gray-400'
                            }`}>
                              {isActive ? '✓' : index + 1}
                            </div>
                            <p className={`text-xs mt-2 font-semibold ${isActive ? 'text-purple-600' : 'text-gray-400'}`}>
                              {step}
                            </p>
                          </div>
                          {index < 3 && (
                            <div className={`h-1 w-16 mx-2 ${
                              isActive ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-200'
                            }`}></div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
