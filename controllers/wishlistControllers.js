// import wishlist model

const wishlist=require('../models/wishlistSchema')

// add to wishlist
exports.addToWishlist=async (req,res)=>{

    // get data from request body

    // destructuring
    const{id,title,price,image}=req.body

    // logic

    try{

        const item=await wishlist.findOne({id})
        if(item){
    
            res.status(403).json('Item already exists in Wishlist')
        }
        else{
    
            // add item in wishlist create an object of collection
            const newItem=new wishlist({
                id,title,price,image
            })
    
            // to save in database
           await newItem.save()
    
           res.status(200).json('Item added to Wishlist')
        }
    }
    catch(error){

        res.status(401).json(error)
    }

   
}

// get wishlist 

exports.getWishlistItem=async (req,res)=>{

    try{

        const allProducts=await wishlist.find()
        res.status(200).json(allProducts)

    }
    catch(error){
        res.status(403).json(error)
    }
}

// delete wishlist
exports.deleteWishlistItem=async (req,res)=>{


    const{id}=req.params

    try{

        const removeWishlistItem=await wishlist.findOne({id})
        if(removeWishlistItem){

         const removedItem= await wishlist.deleteOne({id})
         if(removedItem){

            // get all wishlist items after removing
            const allItem=await wishlist.find()
            res.status(200).json(allItem)
         }
         else{
            res.status(404).json('Item is not present in Wishlist')
         }

        }
        else{
            res.status(403).json('Item is not present')
        }

    }
    catch(error){

        res.status(403).json(error)
    }
}