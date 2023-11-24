const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const hostname = '0.0.0.0';

app.get('/', (req,res) => {
  res.send("Hello World!")
})
app.use('/products', require('./routes/productRoutes.cjs'));
app.use('/register', require('./routes/userRoutes.cjs'));


let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}

app.listen(process.env.PORT || 4000, function() {
  console.log('Server started on port ' + (process.env.PORT || 4000));
});
// app.listen(port, function() {
//     console.log('Server started on port 3000');
//     });