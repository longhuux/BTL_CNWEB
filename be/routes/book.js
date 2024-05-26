// routes/book.js
const express = require('express');
const router = express.Router();
const Book = require('../models/book');

//goi tat ca sach
router.get('/', async (req, res) => {
    try {
        const { name, category } = req.query;
        let filter = {};
        
        if (name) {
            filter.name = new RegExp(name, 'i'); // 'i' để không phân biệt hoa thường
        }
        
        if (category) {
            filter.category = decodeURIComponent(category);
        }
        
        const books = await Book.find(filter);
        
        if (books.length === 0) {
            return res.status(404).json({ message: 'No books found' });
        }
        
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Lấy thông tin một cuốn sách
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Thêm một cuốn sách
router.post('/', async (req, res) => {
    const book = new Book(req.body);
    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Cập nhật thông tin một cuốn sách
router.put('/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Xóa một cuốn sách
router.delete('/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
