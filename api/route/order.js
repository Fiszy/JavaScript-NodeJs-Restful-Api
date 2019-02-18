const express = require("express");
const router = express.Router();



router.post('/', (req, res, next)=>{
    const order = {
        productId : req.body.productId,
        quantity: req.body.quantity
    };
    res.status(200).json({
        message: "Handling post request to /product",
        createdOrder: order 
    });
});


router.get('/:orderId', (req, res, next)=>{

    const id = req.params.productId;

    if(id == "afeez"){
        res.status(200).json({
            message: "Handling afeez",
            id : id
        });
    }
    else{
        res.status(200).json({
            message: "any id"
        });
    }
 
});

router.patch('/:orderId', (req, res, next)=>{

    const id = req.params.orderId;
    res.status(200).json({
        message: "updated",
        
    });
 
});

router.delete('/:orderId', (req, res, next)=>{

    const id = req.params.productId;
    res.status(200).json({
        message: "delete",
        
    });
 
});


module.exports = router;