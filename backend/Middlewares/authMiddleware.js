const jwt = require('jsonwebtoken');

const authorizeApi = async (req,res,next)=>{
    try {
        const {token} = req.body;
        if (!token) {
           throw new Error("Not authorized"); 
        }
        const verified = jwt.verify(token,process.env.JWT_SECRET);
        if (!verified) {
            throw new Error("Not authorized"); 
        }
        next();
    } catch (error) {
        res.status(401).json({error : error.message});
    }
}

module.exports = authorizeApi