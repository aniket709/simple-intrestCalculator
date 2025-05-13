const User = require("../model/usermodel.js")

const bcrypt = require ("bcrypt")
const jwt = require ('jsonwebtoken')


  async function registerUser( req,res){

    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password){

        return res.status(404).json({
            msg : "can not find the credentials"
        })

    }
        try {
      const existingUser= await  User.findOne({username})

      if (existingUser){

        return res.status(403).json({
            msg : "user already found",
        })
      }

      const newUser =  await new User({

        username,
        password

      })
       await  newUser.save();
        
        res.status(201).json({
            msg : "user saved successfully"
        })
    } catch(error){

        console.log(error)
        return res.status(500).json({
            msg : "Internal server crashed "
        })
    }        
    
 }

 async function loginUser(req,res){

    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password){
   return res.status(404).json({
    msg : "enter your credentials"
   })
    }

try {
    const loogedUser=  await User.findOne({username})

    if (!loogedUser){

       return res.status(401).json({
        msg : "enter your correct credentials"
       })
    }

    const isMatch = await bcrypt .compare(password,loogedUser.password)

    if (!isMatch){

        return res.status(403).json({
            msg : "please enter your password correctly"
        })
    }

       const token = jwt.sign({
    
        id: loogedUser._id,
        username:loogedUser.username
       },
       process.env.SECRET_KEY,
       {
        expiresIn : "1hr"
       });

    
return res.status(201).json({
    msg : "user logged in successfully",
    token
});
} catch(error){

    console.log(error)
    return res.status(500).json({
        msg : "Interval server crash "
    })
}
 }

 function calculateSimpleIntrest(req,res){

    const prinsple= Number(req.body.prinsple);
    const rate = Number(req.body.rate);
    const year = Number(req.body.year);

    if (!prinsple || !rate || !year){

        return res.status(404).json({

            msg : "please enter the data ",
        })
    }
const SI =  (prinsple * rate * year)/100;
    return res.status(201).json({

        SimpleInterset : SI
    })
 }

function Hi(req,res){
    res.status(200).json({
        msg : "your token is working fine"
    })
}


 module.exports = {
    registerUser,
    loginUser,
    calculateSimpleIntrest,
    Hi
  };
  
