const express = require('express');
const router = express.Router();
// i have downloaded jsonwebtoken from npm 
const jwt = require('jsonwebtoken');
const secretKey = 'User$ecretKey';

// import Article
const {User} = require('../DB.cjs');


router.route('/')

//! ROUTE:1 Create new user:
    .post(async(req, res) => {
        console.log(req.body)
        try {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                type: req.body.type
            });
            await user.save();
            console.log("User Created Successfully")
            res.send(user);
        } catch (error) {
            console.log(error, 'Server error occured while creating a new user');
        }
    })
   
//! ROUTE:2 GET all users:
    .get(async(req, res) => {
        try {
            const user = await User.find();
            console.log("User Fetched Successfully")
            res.send(user);
        } catch (error) {
            res.send(error, 'Server error occured while fetching all users');
        }
    });
//! ROUTE:3 Login user:"/register/login"
router.route('/login')
    .post(async(req, res) => {
        try {
            const foundUser = await User.findOne({email: req.body.email});
            if(!foundUser) {
                return res.status(400).json({ error: "Please try to login with correct credentials" });
            }
            if (foundUser.password !== req.body.password) {
                return res.status(400).json({ error: "Please try to login with correct credentials" });
            }
            // Generate a JWT token
            const token = jwt.sign({ userId: foundUser._id }, secretKey, { expiresIn: '1h' });

            // res.json({ token });
            // send found user and token
            console.log("User Logged in Successfully")
            res.send({foundUser, token});
        } catch (error) {
            console.log(error, 'Server error occured while logging in');
        }
    })

//! Route:4 Add item to cart, its gonna get a user uath token to verify the user and then get the user's id to add item to his cart.
// front end code for your help:
// const addToCart = async () => {
//     // pass usercart and auth-token from localstorage as headers
//     const response = await axios.post('http://localhost:3000/cart', userCart, {
//         headers: {
//             'auth-token': localStorage.getItem('token')
//         }
//     });
//     const data = await response.data;
//     // console.log(data)
// }
// 
router.route('/addtocart').post(async (req, res) => {
    try {
      const token = req.headers['auth-token'];
      if (!token) {
        return res.status(400).json({ error: "Please login to add item to cart" });
      }
      
      let data;
      try {
        data = jwt.verify(token, secretKey);
        console.log(data);
      } catch (error) {
        console.log(error, 'Error occurred while verifying user');
        return res.status(401).json({ error: "Invalid token" });
      }
      
      // Find user by id
      const user = await User.findById(data.userId);
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }
  
      // Add item to cart
      user.cart.push(req.body);
      await user.save();
  
      console.log("Item added to cart successfully");
      res.status(200).json({ message: 'Item added to cart successfully' });
  
    } catch (error) {
      console.log(error, 'Server error occurred while adding item to cart');
      res.status(500).json({ error: 'Internal server error' });
    }
  });


// export router
module.exports = router;