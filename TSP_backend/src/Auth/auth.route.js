const express = require('express');
const { providerSignup,providerLogin, userSignup, userLogin } = require('./auth.ctrl');
const { validateLoginMiddleware,validateSignupMiddleWare } = require('../Validation/auth.validation')
const router = express.Router();

router.post("/provider/signup", validateSignupMiddleWare, providerSignup);
router.post("/provider/login", validateLoginMiddleware, providerLogin);
router.post("/user/signup", validateSignupMiddleWare, userSignup);
router.post("/user/login", validateLoginMiddleware, userLogin);

module.exports = router;
