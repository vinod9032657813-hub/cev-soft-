import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../model/Ordermodel.js';

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: "rzp_live_ScuvD6uYemOfHn",
    key_secret: "xP6SEBZjvBiDYUzZlw4DBb6K"
});

// Create Razorpay order
export const createRazorpayOrder = async (req, res) => {
    try {
        const { amount, currency = 'INR', receipt } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid amount'
            });
        }

        const options = {
            amount: Math.round(amount * 100), // Amount in paise
            currency,
            receipt: receipt || `order_${Date.now()}`,
            payment_capture: 1 // Auto capture payment
        };

        console.log('Creating Razorpay order with options:', options);

        const order = await razorpay.orders.create(options);
        
        console.log('Razorpay order created:', order.id);

        res.json({
            success: true,
            order: {
                id: order.id,
                amount: order.amount,
                currency: order.currency
            }
        });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Verify Razorpay payment
export const verifyRazorpayPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            orderData
        } = req.body;

        console.log('Verifying payment:', {
            order_id: razorpay_order_id,
            payment_id: razorpay_payment_id
        });

        // Verify signature
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest('hex');

        if (razorpay_signature !== expectedSign) {
            console.error('Payment verification failed: Invalid signature');
            return res.status(400).json({
                success: false,
                message: 'Payment verification failed'
            });
        }

        console.log('Payment signature verified successfully');

        // Create order in database only after successful payment
        const OrderData = {
            items: orderData.items,
            amount: orderData.amount,
            userId: req.userId || 'guest',
            address: orderData.address,
            paymentmethod: 'Razorpay',
            payment: true, // Payment completed
            paymentId: razorpay_payment_id,
            razorpayOrderId: razorpay_order_id,
            date: Date.now()
        };

        const newOrder = new Order(OrderData);
        await newOrder.save();

        console.log('Order created successfully after payment:', newOrder._id);

        res.json({
            success: true,
            message: 'Payment verified and order placed successfully',
            orderId: newOrder._id,
            paymentId: razorpay_payment_id
        });
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Razorpay key for frontend
export const getRazorpayKey = async (req, res) => {
    try {
        res.json({
            success: true,
            key: process.env.RAZORPAY_KEY_ID
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
