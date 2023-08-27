const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// app.use('/articles', articleRoutes);
app.use('/products', require('./routes/productRoutes.cjs'));
app.use('/register', require('./routes/userRoutes.cjs'));


app.listen(3000, function() {
    console.log('Server started on port 3000');
    });