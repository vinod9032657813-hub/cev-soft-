import Order from '../model/Ordermodel.js';

// Place order
export const placeorder = async (req, res) => {
  try {
    console.log('Placing order with data:', req.body);
    const { items, amount, address, paymentMethod } = req.body;
    const userId = req.userId || 'guest';

    const OrderData = {
      items,
      amount,
      userId,
      address,
      paymentmethod: paymentMethod || 'COD',
      payment: false,
      date: Date.now()
    };

    const newOrder = new Order(OrderData);
    await newOrder.save();
    console.log('Order saved successfully:', newOrder._id);

    res.json({ success: true, message: 'Order placed successfully', orderId: newOrder._id });
  } catch (error) {
    console.log('Error placing order:', error);
    res.json({ success: false, message: error.message });
  }
};

// Get all orders (for admin)
export const getAllOrders = async (req, res) => {
  try {
    console.log('Fetching all orders...');
    const orders = await Order.find({}).sort({ createdAt: -1 });
    console.log('Orders found:', orders.length);
    res.json({ success: true, orders });
  } catch (error) {
    console.log('Error fetching orders:', error);
    res.json({ success: false, message: error.message });
  }
};

// Update order status (for admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await Order.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: 'Order status updated' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Delete order (for admin)
export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    await Order.findByIdAndDelete(orderId);
    res.json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get all orders (public - for customers to view their orders)
export const getAllOrdersPublic = async (req, res) => {
  try {
    console.log('Fetching all orders (public)...');
    const orders = await Order.find({}).sort({ createdAt: -1 });
    console.log('Orders found:', orders.length);
    res.json({ success: true, orders });
  } catch (error) {
    console.log('Error fetching orders:', error);
    res.json({ success: false, message: error.message });
  }
};
