const jwt = require("jsonwebtoken");

//USER TOKEN VALIDATION 
const auth = (req,res,next) =>{
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
          return res.status(401).json({ message: 'Unauthorized' });
        }

       const decoded= jwt.verify(token, process.env.JWT_SECRET)    
       req.userId=decoded.userId
            next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });

        console.log(error.message);
    }
  }



  module.exports={auth}
