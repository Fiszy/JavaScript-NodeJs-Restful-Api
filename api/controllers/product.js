const mongoose = require("mongoose");
const Product = require("../models/product");

exports.products_get_all = (req, res, next)=>{
    Product.find()
    .select('name price description color productImage _id')
    .exec()
    .then(docs => {
        console.log(docs);
        // if(docs.length >= 0){
        const response = {
            count: docs.length,
            products: docs.map(doc =>{
                return {
                    name: doc.name,
                    price: doc.price,
                    description: doc.description,
                    color: doc.color,
                    productImage: doc.productImage,
                    _id: doc._id,
                    request: {
                        type:  'GET',
                      url: 'http://localhost:3000/product/'+doc._id
                      }
                }
            })
        };
        res.status(200).json(response);
        // }else{
        //     res.status
        // }
    })
    .catch(err =>{ 
        console.log(err);
        res.status(500).json({error: err});
    
    
    });
};

exports.product_create_new =  (req, res, next) =>{
   // console.log(req.file);

    if (!req.body.name  || !req.body.price  || !req.body.description )
    {
       // res.send("All fields are required");
        res.json({success:false, message:'All fields are required'});
    }
    else if(!req.file ){
        res.json({success:false, message:'Image is required'});
    }
    
    else{

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        color: req.body.color,
        description: req.body.description,
        productImage: req.file.path,
        
      });
      product.save().then(result =>{
          console.log(result);
          res.status(201).json({
              success:true,
            message: "Product Created",
            createdProduct: {
                name: result.name,
                price: result.price,
                description: result.description,
                color: result.color,
                image: result.productImage,
                _id: result._id,
                request: {
                  type:  'GET',
                url: 'http://localhost:3000/product/'+result._id
                }
            }
        });
      })
      .catch(err =>{ 
        console.log(err);
        res.status(500).json({error: err});
    
    
    });
}


};

exports.show_product = (req, res, next)=>{

    const id = req.params.productId;

    Product.findById(id)
    .exec()
    .then(doc =>{
        console.log("FRom db", doc);
       

        if(doc){
            res.status(200).json(doc);
        }else{
                        res
              .status(404)
              .json({ message: "Product Id is not valid" });
        }
        // if (doc) {
        //     res.status(200).json({
        //       product: doc,
        //       request: {
        //         type: "GET",
        //         url: "http://localhost:3000/product"
        //       }
        //     });
        //   } else {
        //     res
        //       .status(404)
        //       .json({ message: "No valid entry found for provided ID" });
        //   }
    })
    .catch(err =>{ 
        console.log(err);
        res.status(500).json({error: err});
    
    
    });


 
};

exports.update_product =  (req, res, next)=>{

    const id = req.params.productId;

    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
  
    //sent json should be of this form

    // [
	
    //     {"propName": "name", "value": "new movie"}	,	{"propName": "price", "value": "7000"},	{"propName": "description", "value": "new movie description"}
        
    // ]
    Product.update({_id:id},
        { $set: updateOps
    }).
    exec()
    .then(result =>{
        res.status(200).json(result);
        
    })
    .catch(err =>{ 
        console.log(err);
        res.status(500).json({error: err});
    
    
    });
    

   
};

exports.delete_prod = (req, res, next)=>{

    const id = req.params.productId;
    Product.remove({_id: id}).
    exec()
    .then(result =>{
        res.status(200).json(result);
        
    })
    .catch(err =>{ 
        console.log(err);
        res.status(500).json({error: err});
    
    
    });
 
};