const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const avaiableLang=["english","japanese","chinese","french"];
// error messages 
const EROR_Y201 = "Email already register";
const EROR_Y202 = "Language not avaiable";
const EROR_Y203 = "Email or password is wrong";
const EROR_Y204 = "Invalid password";
const EROR_Y205 = "Required fields are missing";
/**
 *  API  
 *  POST api/register
 *  register user 
 */
router.post('/register',async (req,res)=>{
    
    if( !req.body.email || !req.body.password || !req.body.name )
    return res.status(200).send({"error":EROR_Y205});
    const emailExist =await User.findOne({email: req.body.email});
    if(emailExist) return res.status(200).send({"error":EROR_Y201});
    //Hash password    
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password,salt);
    
            
    if(req.body.language){
        if(!avaiableLang.includes(req.body.language)) {        
            return res.status(400).send({"error":EROR_Y202});        
        }      
    }
    
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword, 
        language: req.body.language     
    })      
        
    
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
});

/**
 *  API  
 *  POST api/login
 *  login user 
 *  return Authorization Token 
 */
router.post('/login',async (req,res)=>{
    if( !req.body.email || !req.body.password  )
    return res.status(200).send({"error":EROR_Y205});

    const user=await User.findOne({email: req.body.email});
    if(!user) return res.status(200).send({"error":EROR_Y203});
    // check Password 
    const validPass = await bcrypt.compare(req.body.password,user.password);            
    if(!validPass) return res.status(200).send({"error":EROR_Y204});
            
    const token=jwt.sign({_id:user._id},process.env.TOKEN);
    res.header('Authorization',token).send({"token":token,"user": user});
            

});


module.exports = router;