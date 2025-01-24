const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if(!token){
          return  res.status(401).json({
                message:"token not found",
                success:false
            });
        }

        const tokenString = token.replace('Bearer ', '');

        const decoded=jwt.verify(tokenString,process.env.JWT_SECRET_KEY)
        req.user=decoded;
        console.log(decoded);
        next();

    } catch (error) {
        console.log('authmiddleware error',error);
        res.status(401).json({
            message:"auth error",
            success:false
        })
    }
}