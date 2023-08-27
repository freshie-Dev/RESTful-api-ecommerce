const express = require('express');
const router = express.Router();

// import Article
const {Product} = require('../DB.cjs');

router.route('/')

//! ROUTE:1 GET all products:

    .get(async(req, res) => {
        try {
            const products = await Product.find();
            res.send(products);
        } catch (error) {
            res.send(error);
        }
    })
//! ROUTE:2 POST a new product:
    .post(async(req, res) => {
        try {
            const product = new Product({
                name: req.body.name,
                description: req.body.description,
                colors: req.body.colors,
                price: req.body.price,
                category: req.body.category,
                brand: req.body.brand,
                imageUrl: req.body.imageUrl,
                stock: req.body.stock,
                ratings: req.body.ratings
            });
            await product.save();
            res.send(product);
        } catch (error) {
            console.log(error, 'Error occured while creating a new product');
        }
    })
//! ROUTE:3 Update category of all products:
    .patch(async(req, res) => {
        try {
            const products = await Product.updateMany({category: req.body.oldCategory}, {$set: {category: req.body.newCategory}});
            res.send(products);
        } catch (error) {
            console.log(error, 'Error occured while updating category of all products');
        }
    })
//! ROUTE:4 Find 1 product by id:
router.route('/:id')
    .get(async(req, res) => {
        if(!req.params.id) {
            return res.status(400).json({ error: "Please provide product id" });
        }
        try {
            const product = await Product.findById(req.params.id);
            if(!product) {
                // return res.status(400).json({ error: "No product found with this id" });
                console.log("noproduct withthis id")
            }
            console.log("Single Product found")
            res.send(product);
        } catch (error) {
            console.log(error, 'Server error occured while finding a product by id');
        }
    })


// export router
module.exports = router;