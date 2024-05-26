// models/order.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    totalPrice: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
    cartItems: [cartItemSchema],
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
