// const bcript = require('bcryptjs');
var jwt = require('jsonwebtoken');
 const jwtSecrete = "varad@6862"

const fetchuser = (req, res, next) => {
    // get the user from the jwt token and add is req object
    const token = req.header('auth-token')
    if (!token) {
        return res.status(401).send({error : "please authenticate using the valid token"})

    }
    try {
        const data = jwt.verify(token , jwtSecrete )
        req.user = data.user
        next()
        
    } catch (error) {
        return res.status(401).send({error : "please authenticate using the valid token"})
    }
   
}


module.exports = fetchuser