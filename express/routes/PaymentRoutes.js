import express from 'express';
import { createRazorpayOrder, verifyRazorpayPayment, getRazorpayKey } from '../controller/PaymentController.js';

const paymentRouter = express.Router();

// Get Razorpay key
paymentRouter.get('/razorpay-key', getRazorpayKey);

// Create Razorpay order
paymentRouter.post('/create-order', createRazorpayOrder);

// Verify Razorpay payment
paymentRouter.post('/verify-payment', verifyRazorpayPayment);

export default paymentRouter;
