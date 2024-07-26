const express = require('express');
const router = express.Router();
const {addMenu,getMenu,editMenu,getUserMenu} = require('./menu.ctrl');


router.post("/",addMenu);
router.get("/provider",getMenu);
router.put("/",editMenu);
router.get("/user",getUserMenu);


module.exports=router;