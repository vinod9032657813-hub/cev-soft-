import { useContext, useEffect, useState } from 'react';
import { authDataContext } from '../Context.js/AuthContext';
import axios from 'axios';
import { FiPackage, FiTrash2, FiRefreshCw, FiSearch, FiCalendar } from 'react-icons/fi';

const Orders = () => {
  const { serverurl, token } = useContext(authDataContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      console.log('Fetching orders with token:', token ? 'Token exists' : 'No token');
      console.log('Server URL:', serverurl);
      
      const response = await axios.get(serverurl + '/api/order/list', {
        headers: { token }
      });
      
      console.log('Orders response:', response.data);
      
      if (response.data.success) {
        setOrders(response.data.orders);
        console.log('Orders loaded:', response.data.orders.length);
      } else {
        console.error('Failed to fetch orders:', response.data.message);
        alert('Failed to fetch orders: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      console.error('Error response:', error.response?.data);
      alert('Error fetching orders. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const updateStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.post(
        serverurl + '/api/order/status',
        { orderId, status: newStatus },
        { headers: { token } }
      );

      if (response.data.success) {
        fetchOrders();
        alert('Order status updated successfully!');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update order status');
    }
  };

  const deleteOrder = async (orderId) => {
    if (!confirm('Are you sure you want to delete this order?')) return;

    try {
      const response = await axios.delete(
        serverurl + `/api/order/delete/${orderId}`,
        { headers: { token } }
      );

      if (response.data.success) {
        fetchOrders();
        alert('Order deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to delete order');
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'order placed':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate today's orders
  const getTodaysOrders = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return orders.filter(order => {
      const orderDate = new Date(order.date);
      orderDate.setHours(0, 0, 0, 0);
      return orderDate.getTime() === today.getTime();
    });
  };

  const todaysOrders = getTodaysOrders();

  // Filter orders based on search query
  const filteredOrders = orders.filter(order => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    
    // Search in customer name
    const customerName = order.address.name.toLowerCase();
    if (customerName.includes(query)) return true;
    
    // Search in product names
    const hasMatchingProduct = order.items.some(item => 
      item.name.toLowerCase().includes(query)
    );
    if (hasMatchingProduct) return true;
    
    // Search in order ID
    const orderId = order._id.toLowerCase();
    if (orderId.includes(query)) return true;
    
    return false;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-3 text-white shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-xl font-bold">Orders Management</h1>
              <p className="text-purple-100 text-xs">
                Total: {orders.length} | Showing: {filteredOrders.length}
              </p>
            </div>
            {/* Today's Orders Badge */}
            {todaysOrders.length > 0 && (
              <div className="flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <FiCalendar className="w-4 h-4" />
                <span className="text-xs font-semibold">Today</span>
                <span className="bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full text-xs font-bold animate-pulse">
                  {todaysOrders.length}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={fetchOrders}
            className="bg-white text-purple-600 px-2.5 py-1 rounded text-xs font-semibold hover:bg-purple-50 transition-colors flex items-center gap-1"
          >
            <FiRefreshCw className="w-3 h-3" />
            Refresh
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer name, product name, or order ID..."
            className="w-full pl-10 pr-4 py-2 text-sm text-gray-800 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 placeholder-gray-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <FiPackage className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Orders Yet</h3>
          <p className="text-gray-600">Orders will appear here once customers place them.</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <FiSearch className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Results Found</h3>
          <p className="text-gray-600">No orders match your search: "{searchQuery}"</p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredOrders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-3">
                {/* Order Header */}
                <div className="flex items-center justify-between mb-2 pb-2 border-b">
                  <div className="flex items-center gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-gray-800">Order #{order._id.slice(-8)}</h3>
                        {/* Today's Order Badge */}
                        {(() => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          const orderDate = new Date(order.date);
                          orderDate.setHours(0, 0, 0, 0);
                          return orderDate.getTime() === today.getTime();
                        })() && (
                          <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-0.5 rounded-full text-xs font-bold animate-pulse">
                            NEW
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600">
                        {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="grid md:grid-cols-2 gap-3 mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1 text-xs">Customer Details</h4>
                    <p className="text-xs text-gray-600"><span className="font-medium">Name:</span> {order.address.name}</p>
                    <p className="text-xs text-gray-600"><span className="font-medium">Email:</span> {order.address.email}</p>
                    <p className="text-xs text-gray-600"><span className="font-medium">Phone:</span> {order.address.phone}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1 text-xs">Delivery Address</h4>
                    <p className="text-xs text-gray-600">{order.address.street}</p>
                    <p className="text-xs text-gray-600">{order.address.city}, {order.address.pincode}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      <span className="font-medium">Payment:</span> {order.paymentmethod} 
                      {order.payment ? ' (Paid)' : ' (Pending)'}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-2">
                  <h4 className="font-semibold text-gray-700 mb-1.5 text-xs">Order Items</h4>
                  <div className="space-y-1">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-1.5 bg-gray-50 rounded">
                        <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800 text-xs">{item.name}</p>
                          <p className="text-xs text-gray-600">
                            Size: {item.size} | Qty: {item.quantity} | ₹{item.price}
                          </p>
                        </div>
                        <p className="font-bold text-purple-600 text-xs">₹{item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Total and Status Update */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div>
                    <p className="text-xs text-gray-600">Total Amount</p>
                    <p className="text-base font-bold text-purple-600">₹{order.amount}</p>
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="px-2 py-1 text-xs border-2 border-gray-200 rounded-lg focus:border-purple-400 focus:outline-none font-medium"
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;