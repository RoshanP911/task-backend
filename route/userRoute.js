const express = require ("express")
const router = express.Router()

const {auth} = require("../middleware/jwt.js")
const userController = require("../controller/userController.js") 


router.post('/signup',userController.userRegistration);
router.post('/login', userController.userLogin);
router.get('/userdetails',auth, userController.userDetails);


module.exports = router;
