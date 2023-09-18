const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const hostname = '0.0.0.0';

// app.use('/articles', articleRoutes);
app.use('/products', require('./routes/productRoutes.cjs'));
app.use('/register', require('./routes/userRoutes.cjs'));


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
    console.log('Server started on port 3000');
    });