const jwt = require('jsonwebtoken');

const authorizeApi = async (req,res,next)=>{
    try {
        const {token} = req.headers;
        console.log("Token in Mifddleware: "+token);
        if (!token) {
           throw new Error("Token not found"); 
        }
        const verified = jwt.verify(token,process.env.JWT_SECRET);
        if (!verified) {
            throw new Error("Token not verified"); 
        }
        next();
    } catch (error) {
        res.json({error : error.message});
    }
}

module.exports = authorizeApi