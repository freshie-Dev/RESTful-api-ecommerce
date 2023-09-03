const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3000;
const hostname = '0.0.0.0';

// app.use('/articles', articleRoutes);
app.use('/products', require('./routes/productRoutes.cjs'));
app.use('/register', require('./routes/userRoutes.cjs'));


app.listen(port, hostname, function() {
    console.log('Server started on port 3000');
    });