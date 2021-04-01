const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//set up express

const app = express();
app.use(express.json());
// app.use(cors());
const allowed_domains = [
    "http://localhost:3000"
]
app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin) return callback(null, true);
  
        if (allowed_domains.indexOf(origin) === -1) {
          var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
          console.log(msg);
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
      credentials: true,
    })
)
  

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`Server up and running on port ${port}`));

//set up mongoose

mongoose.connect
    (process.env.MONGODB_CONNECTION_STRING, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true
    },
    (err) => {
        if(err) throw err;
        console.log("MongoDB connection established");
    }
)

//set up Woocommerce
var WooCommerceAPI = require('woocommerce-api');
 

//routes

app.use("/users", require("./routes/userRouter"));
