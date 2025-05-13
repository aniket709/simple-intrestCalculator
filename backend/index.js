
const cors= require("cors")
const express= require ('express');
const dotenv = require("dotenv")
const app = express();
app.use(express.json());

const userRoutes = require("./route/userRoutes")

  dotenv.config();

  app.use(cors());


app.use("/api/user",userRoutes); // middleware which are plugged in the all request 

const PORT = process.env.PORT || 30001
app.listen(PORT ,()=>{
    console.log(`server is running on the ${PORT}`);
} )



