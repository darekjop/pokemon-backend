const jwt = require('jsonwebtoken');



/**
 *  verify token is  for all urls  using
 *  verify if token is combination user_id and SERCRET TOKEN save in .env
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = function (req,res,next){
    const token = req.header('Authorization');
    if(!token) return res.status(401).send('Access Denied') ;
    try{
        const verified = jwt.verify(token,process.env.TOKEN)
        req.user = verified;
        next();
    }catch(err){
       res.status(400).send({"error":'Invalid token'});
    }

}