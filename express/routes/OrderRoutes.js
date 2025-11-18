import express from 'express';
import { placeorder, getAllOrders, updateOrderStatus, deleteOrder, getAllOrdersPublic } from '../controller/Ordercontroller.js';
import adminAuth from '../middleware/adminAuth.js';

const orderRouter = express.Router();

// Place order (public route)
orderRouter.post('/place', placeorder);

// Get all orders - public (for customers)
orderRouter.get('/all', getAllOrdersPublic);

// Get all orders (admin only)
orderRouter.get('/list', adminAuth, getAllOrders);

// Update order status (admin only)
orderRouter.post('/status', adminAuth, updateOrderStatus);

// Delete order (admin only)
orderRouter.delete('/delete/:orderId', adminAuth, deleteOrder);

export default orderRouter;
