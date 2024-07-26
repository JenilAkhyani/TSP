const express =require('express');
const authRoutes = require('./Auth/auth.route');
const menuRoutes = require('./MenuServices/menu.route');
const areaRoutes = require('./AreaServices/area.route');
const orderRoutes = require('./Order/order.route');
const router = express.Router();

router.use('/auth',authRoutes);
router.use('/menu',menuRoutes);
router.use('/area',areaRoutes);
router.use('/order',orderRoutes);

module.exports = router;