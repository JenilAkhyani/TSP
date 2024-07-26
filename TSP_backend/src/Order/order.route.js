const express = require('express');
const router = express.Router();
const {placeOrder} = require('./order.ctrl');

router.post("/place",placeOrder);


module.exports=router;