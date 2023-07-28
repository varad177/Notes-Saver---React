const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcript = require('bcryptjs');
var jwt = require('jsonwebtoken');
const jwtSecrete = "varad@6862"
const fetchuser = require('../middleware/fetchuser')
// let success  = false;

//ROUTE ONE create a user using the POST "/api/auth/" . doent require auth

try {
    router.post('/createuser', async (req, res) => {
        const userexist = await User.findOne({ email: req.body.email });
        if (userexist) {
            return res.status(400).json({ error: "user with this email already exist" })
        }

        const salt = await bcript.genSalt(10);
        const secpass = await bcript.hash(req.body.password, salt)


        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secpass

        })

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, jwtSecrete)
        // console.log(authToken);

        // res.json(user)
         success = true;
        res.json( {success , authToken})
        // res.json(  authToken)
    })

} catch (error) {
    return res.send("Name, Email or Password Aleary Exist, Kindly Enter The Unique Values ")

}



//ROUTE 2 authenticate the user 
router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct data" })
        }
        const passwordCompare = await bcript.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct data" })
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, jwtSecrete)
        success = true
         res.json( {success , authToken})
        // res.json(  authToken)
    }

    catch (error) {
        return res.send("some error occured")

    }
});

//ROUTE 3 -> get user details login required  

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        return res.send("some error occured")
    }
})




module.exports = router