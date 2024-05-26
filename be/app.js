// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bookRouter = require('./routes/book');
const orderRouter = require('./routes/order');

const cors = require('cors');


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/books', bookRouter);
app.use('/orders', orderRouter);


mongoose.connect('mongodb://localhost/tiki', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
