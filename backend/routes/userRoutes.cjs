const express = require('express');
const router = express.Router();
// i have downloaded jsonwebtoken from npm 
const jwt = require('jsonwebtoken');
const secretKey = 'User$ecretKey';

// import Article
const {User} = require('../DB.cjs');
const { Product } = require ('../DB.cjs')


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
          // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, secretKey /*, { expiresIn: '1h' }*/);
          res.send({user, token});
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
            res.send(error, 'Server error occured while fetching all user"s data');
        }
    });

//! ROUTE:2 GET 1 user:
router.route('/userinfo')
    .get( async (req,res)=>{
        try {
            // Get the user ID from the token
            const token = req.header('auth-token');
            const { userId } = jwt.decode(token);
        
            // Fetch the user by ID
            const user = await User.findById(userId);
        
            if (!user) {
            return res.status(404).json({ message: 'User not found' });
            }
        
            console.log('User Fetched Successfully', token);
            res.status(200).json(user);
        } catch (error) {
            console.error('Error fetching user:', error.message);
            res.status(500).json({ message: 'Server error occurred while fetching user data' });
        }
        })
        //! Update user infoemation
        .put(async (req, res) => {
            try {
              // Get the user ID from the token
              const token = req.header('auth-token');
              const { userId } = jwt.decode(token);
          
              // Fetch the user by ID
              const user = await User.findById(userId);
          
              if (!user) {
                return res.status(404).json({ message: 'User not found' });
              }
          
              // Update user information based on request data
              if (req.body.name !== user.name) {
                user.name = req.body.name;
              }
              if (req.body.password !== user.password) {
                user.password = req.body.password;
              }
          
              // Save the updated user
              await user.save();
          
              console.log('User Updated Successfully', token);
              res.status(200).json({ message: 'User information updated successfully' });
            } catch (error) {
              console.error('Error updating user:', error.message);
              res.status(500).json({ message: 'Server error occurred while updating user data' });
            }
          })
 

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
      user.cart.push(...req.body);

      const newOrder = {
        items: req.body,
      }
      user.orders.push(newOrder)
      await user.save();
  
      console.log("Item added to cart successfully");
      res.status(200).json({ message: 'Item added to cart successfully', orders: user.orders });
  
    } catch (error) {
      console.log(error.message, 'Server error occurred while adding item to cart');
      res.status(500).json({ error: 'Internal server error', });
    }
  });

  //! Route to post User Review on a product
  router.route('/review').post(async (req, res) => {
    try {
      // Extract data from the request body
      const { stars, reviews, productId } = req.body;
  
      // Get the user's authentication token from the request headers
      const token = req.headers['auth-token'];
      console.log('Received token:', token); // Debug
  
      if (!token) {
        return res.status(400).json({ error: "Please login to add a review" });
      }
  
      // Verify the user's token to get their user ID
      let userData;
      try {
        userData = jwt.verify(token, secretKey);
      } catch (error) {
        console.log(error, 'Error occurred while verifying user');
        return res.status(401).json({ error: "Invalid token" });
      }
      console.log('Decoded user data:', userData); // Debug
      // Find the product by its ID
      const product = await Product.findById(productId);
      console.log('Found product:', product); // Debug

      if (!product) {
        return res.status(400).json({ error: "Product not found" });
      }

      // Create a new review object
      const newReview = {
        userId: userData.userId,
        stars,
        reviews,
      };

      // Push the new review into the product's reviews array
      product.ratings.push(newReview);
  
      // Save the product object with the updated reviews array
      await product.save();
  
      console.log("Review added to the product successfully");
      res.status(200).json({ message: 'Review added successfully', review: newReview });
  
    } catch (error) {
      console.log(error.message, 'Server error occurred while adding a review');
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
// export router
module.exports = router;