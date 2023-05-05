// import poduct model
const products=require('../models/productSchema')

// get all products api

exports.getAllProducts=async (req,res)=>{
try{
    const allProducts= await products.find()
    res.status(200).json(allProducts)
}
catch(error) {

    res.status(401).json(error)
}
}

// view product
exports.viewProduct=async (req,res)=>{
    // get product id from request
    const id=req.params.id
    // check id in mongodb
    try{
        const product=await products.findOne({id})
        if(product){

            res.status(200).json(product)
        }
        else{
            res.status(404).json('Product Not Found!!')
        }

    }
    catch(error){
        res.status(401).json(error)

    }
}