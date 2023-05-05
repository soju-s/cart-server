// to solve cilent request we need to give path to resolve it

// import express
const express=require('express')

// import product controller

const productController=require('../controllers/productController')

// import wishlist controller
const wishlistCOntroller=require('../controllers/wishlistControllers')

//  import cart controller
const cartController=require('../controllers/cartController')

// using express creater object for router class inorder to setup path 

const router=new express.Router()

// api calls

// resolve client  request to get all products

router.get('/products/all-products',productController.getAllProducts)

// to get view products

router.get('/products/view-products/:id',productController.viewProduct)

// add to wishlist
router.post('/wishlist/add-product',wishlistCOntroller.addToWishlist)

// get add wishlist
router.get('/wishlist/get-items',wishlistCOntroller.getWishlistItem)

// delete wishlist item
router.delete('/wishlist/remove-item/:id',wishlistCOntroller.deleteWishlistItem)

// add to cart
router.post('/cart/add-cart',cartController.addToCart)

// get cart
router.get('/cart/all-cart',cartController.getCart)

// remove from cart
router.delete('/cart/remove-item/:id',cartController.deleteFromCart)

// remove all item from cart
router.delete('/cart/remove-all-item',cartController.deleteAllItem)

// increment quantity value
router.get('/cart/increment-quantity/:id',cartController.incrementCart)

// decrement quantity item
router.get('/cart/decrement-quantity/:id',cartController.decrementCart)


// export router
module.exports=router