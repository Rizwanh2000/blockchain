
module.exports = {
    auth_me:function  (req, res, next){    
        console.log(req.query.uid);
        console.log(req.query.pass);
        if (!("admin" === req.query.uid && "12345" === req.query.pass)){
            return res.redirect("/")
        } 
        next();
    }
}