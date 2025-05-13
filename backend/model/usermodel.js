

const bcrypt= require('bcrypt')
const mongoose= require("mongoose");

mongoose.connect("mongodb+srv://aniketranjan19102002:Aniket123@cluster0.by5uau8.mongodb.net/")
.then(()=>{
    console.log(`Mongodb is connected`)
})
.catch((error)=>`console.log${error}`);


const userSchema= new mongoose.Schema({

    username : String,
    password : String,
})

userSchema.pre("save",async function(next){

    if (!this.isModified("password"))
    return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password,salt);
  next();

})


const User = mongoose.model('User',userSchema);

module.exports=User;




