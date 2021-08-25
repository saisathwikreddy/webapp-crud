require('dotenv').config()

const jwt = require("jsonwebtoken");

const authenticateToken=(req, res, next)=>{
    const authHeader=req.headers['authorization'] || req.body.token;
    console.log(authHeader);
    const token= authHeader && authHeader.split(' ')[1];
    console.log(token);
    if(token==null) return res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_KEY, (err,user)=>{
        console.log(err);
        if(err) return res.sendStatus(403);
        req.user=user;
        console.log(user)
        next();
    })
}

const adminauthenticateToken=(req, res, next)=>{
    const authHeader=req.headers['authorization'] || req.body.token;
    console.log(authHeader);
    const token= authHeader && authHeader.split(' ')[1];
    console.log(token);
    if(token==null) return res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_KEY, (err,user)=>{
        console.log(err);
        if(err) return res.sendStatus(403);
        req.user=user;
        if(req.user.name!="admin") return res.sendStatus(401);
        console.log(user)
        next();
    })
}

module.exports={
    authenticateToken,
    adminauthenticateToken
}