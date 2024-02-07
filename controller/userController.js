const User = require("../model/userModel.js");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');


//NEW USER SIGNUP
const userRegistration = async (req, res) => {
    const { name, email, password, mobile } = req.body;

    try {
     const existingUser = await User.findOne({ email: email });
     if(existingUser){
        res
          .status(200)
          .json({ message: "User or email already exists", success: false });
     }
     else{
        const hashPassword = await bcryptjs.hash(password, 10);
         await User.create({
            name: name,
            email: email,
            password: hashPassword,
            mobile: mobile,
          });

          res
          .status(201)
          .json({ message: "Registration successful", success: true });

     }

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}



//USER LOGIN
const userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (email && password) {
        const isUser = await User.findOne({ email: email });

            if (isUser) {
          const passwordsMatch = await bcryptjs.compare(password,isUser.password);
  
          if (passwordsMatch) {
            const token = jwt.sign({ userId: isUser._id }, process.env.JWT_SECRET);
            if (!token) {
              return res.status(500).json({ message: "Failed to generate token", success: false });
            }
   
  
            return res.status(200).json({
              message: "Login Successful",
              token: token,
              success: true,
              isUser,
            });
          } else {
            return res
              .status(400)
              .json({ message: "Invalid Credentials ", success: false });
          }
        }
     else {
          return res
            .status(400)
            .json({ message: "User is not registered", success: false });
        }
      } else {
        return res
          .status(400)
          .json({ message: "Fill all fields", success: false });
      }
    } catch (error) {
      return res
      .status(500)
      .json({ message: "Something went wrong", success: false });
    }
  };
  


  const userDetails = async (req, res) => {
    try {
        const userId=req.userId
        const userData=await User.findById(userId)
        return res.json( userData);
    } catch (error) {
        console.log(error);
    }
  }


module.exports = {
    userRegistration,
    userLogin,
    userDetails
}