// routes/order.js
const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Tạo một đơn hàng mới
router.post('/', async (req, res) => {
    const order = new Order(req.body);
    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Lấy tất cả đơn hàng
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Lấy thông tin một đơn hàng
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('cartItems.bookId');
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
