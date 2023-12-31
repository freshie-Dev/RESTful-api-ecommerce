// Setting up mongoose in a different file:
const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const options = {
    useNewUrlParser: true,
    family: 4 // Use IPv4, skip trying IPv6
  };

const connectToMongoDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://dbUser:admin@cluster0.dk70mwt.mongodb.net/ShopEaseDB', options);
        // await mongoose.connect('mongodb+srv://dbUser:admin@cluster0.dk70mwt.mongodb.net/EcommerceDB', options);
        console.log('Connected to MongoDB')

    } catch (error) {
        console.log(error, 'Error connecting to MongoDB')
    }
}
connectToMongoDB();


//! Creating a schema for the product:
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        // required: true
    },
    colors: [
        {
            type: String,
            // required: true
        }
    ],
    price: {
        type: Number,
        // required: true
    },
    category: {
        type: Array,
        // required: true
    },
    brand: {
        type: String,
        // required: true
    },
    imageUrl: {
        type: String,
        // required: true
    },
    stock: {
        type: Number,
        // required: true
    },
    ratings: [
        {
            stars: {
                type: Number,
                // required: true
            },
            reviews: {
                type: String,
                // required: true
            },
            userId: {
                type : Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//! Creating a schema for user:
const userSchema = new Schema({
    name: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        // required: true
    },
    type: {
        type: String,
        // required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    cart: [{
            productId: {
                type: Schema.Types.ObjectId, // Assuming you're using ObjectId for unique IDs
                ref: 'Product', // Reference to your Product schema/collection
                // required: true
            },
            quantity: {
                type: Number,
                // required: true
            },
            color: {
                type: String,
            }
            
        }],
    orders: [{
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: {
                type: Number,
            },
            color: {
                type: String,
            },
            imageUrl: {
                type :String ,
            },
            name: {
                type  :String,
            },
            price: {
                type   :Number,
            },
            brand: {
                type    :String,
            }
        }],
        orderDate: {
            type: Date,
            default: Date.now
        }
    }]
});

//! Creating a model for the product:
const Product = mongoose.model('Product', productSchema);
//! Creating a model for the user:
const User = mongoose.model('User', userSchema);


module.exports = {Product, User};

