const express = require('express');
const { sales, productWiseSale,} = require('../controllers/SalesNavigation');
const router = express.Router();
router.post('/get-total-sale',sales);
router.post('/get-product-wise-sale',productWiseSale);
module.exports=router;