const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Product = require("../models/product");

const multer = require('multer');
const ProductsController = require('../controllers/product');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString()+file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
const upload = multer({
    storage: storage,
    fileFilter: fileFilter

});
// const upload = multer({storage: storage, limits:{
//     fileSize: 1024 * 1024 * 5,
// }});
//send post request to http://anyurl.com/product  
//params name:String price:Number description:String color:String image:jpg/png
router.post('/', upload.single('productImage') ,ProductsController.product_create_new);
http://anyurl.com/product 
router.get('/', ProductsController.products_get_all );

http://anyurl.com/product/anyid
router.get('/:productId', ProductsController.show_product);

router.patch('/:productId', ProductsController.update_product);

router.delete('/:productId', ProductsController.delete_prod);


module.exports = router;