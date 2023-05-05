// import model

const carts=require('../models/cartSchema')

// add to cart

exports.addToCart=async (req,res)=>{


    const{id,title,image,price,quantity}=req.body

    try{

        // logic when add to cart button click find it in db and if there increment quantity

        const product=await carts.findOne({id})
        if(product){

            // increment quantity
            product.quantity+=1
            // update grand total
            product.grandTotal=product.quantity*product.price

            // save the updates in  db

          await  product.save()

            // response to client

            res.status(200).json('Items added to Cart')
        }
        else{

            const newProduct= new carts({
                id,
                title,
                price,
                image,
                quantity,
                grandTotal:price

            })

           await  newProduct.save()

            // response to client

            res.status(200).json('Item added to cart')

        }

    }
    catch(error){

        res.status(401).json(error)
    }

}

// get cart

exports.getCart =async(req,res)=>{
    try{


        const allItems= await carts.find()
        res.status(200).json(allItems)

    }
    catch(error){
        res.status(401).json(error)
    }
}

// delete from cart
exports.deleteFromCart=async (req,res)=>{


    const{id}=req.params

    try{

        const deleteCartItem= await carts.findOne({id})
        if(deleteCartItem){

            const removedItem= await carts.deleteOne({id})

            if(removedItem){

                const allCartItem=await carts.find()
                res.status(200).json(allCartItem)
            }
            else{
                res.status(401).json('Items not present in database')
            }
        }
        else{
            res.status(401).json('Items not present in database')
        }

    }
    catch(error){
        res.status(403).json(error)
    }
}

// delete all items from cart
exports.deleteAllItem=async (req,res)=>{

    try{


        await carts.deleteMany({})
        res.status(200).json('Your Cart is Empty')

    }
    catch(error){
       
        res.status(403).json(error)
    }
}

// increment button
exports.incrementCart=async (req,res)=>{

    const{id}=req.params

    try{

        const product=await carts.findOne({id})

        if(product){
            product.quantity+=1
            product.grandTotal=product.quantity*product.price

           await product.save()

        //    to show the updated array

        const cartProduct=await carts.find()
            res.status(200).json(cartProduct)
        }
        else{
            res.status(404).json('Product is not in your cart')
        }

    }
    catch(error){

        res.status(403).json(error)
    }
}

// decrement value button
exports.decrementCart=async (req,res)=>{

    const{id}=req.params

    try{

        const product=await carts.findOne({id})
        if(product){

            product.quantity-=1
            if(product.quantity==0){

                await carts.deleteOne({id})
                const cartProduct=await carts.find()
                res.status(200).json(cartProduct)
            }
            else{

                product.grandTotal=product.quantity*product.price

                await product.save()

                const cartProduct=await carts.find()
                res.status(200).json(cartProduct)
            }
        }
        else{
            res.status(404).json('product is not in cart')
        }
    }
    catch(error){

        res.status(403).json(error)
    }
}