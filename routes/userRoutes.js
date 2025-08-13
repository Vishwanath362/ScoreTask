const userController  = require("../controllers/auth.js");

const express = require("express");
const router = express.Router();

router.post('/register',userController.signin);
router.post('/login',userController.login);

module.exports = router;