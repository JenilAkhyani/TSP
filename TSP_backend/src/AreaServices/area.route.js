const express = require('express');
const router = express.Router();
const {addArea,linkArea} = require('./area.ctrl');

router.post('/',addArea);
router.post('/order/link',linkArea);

module.exports=router;