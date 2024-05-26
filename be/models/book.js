// models/book.js
const mongoose = require('mongoose');

const specificationSchema = new mongoose.Schema({
    name: String,
    value: String
});

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    saleRatio: { type: Number, default: 0 },
    ratingAverage: { type: Number, min: 0, max: 5, default: 0 },
    description: { type: String, required: true },
    images: [String],
    currentSeller: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    specifications: [specificationSchema],
    thumbnail: { type: String, required: true } 
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
