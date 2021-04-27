const express = require('express')
const pictureRouter = require('./routes/api');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const PORT = 4000;
const app = express()
dotenv.config();
app.use(cors());

app.all("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    if (req.method === "OPTIONS") {
        res.status(200).end();
    } else {
        next();
    }
});
const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}
mongoose.connect(process.env.DB_CONNECT, connectionParams)
    .then(() => {
        console.log('Connect')
    })
    .catch((err) => {
        console.log(`erroe connection ${err}`)
    })
app.use(express.static(__dirname));
app.use(fileUpload({ createParentPath: true }));

app.use('/',function(req,res,next){
    console.log("middleware    ", req.path)
    if(!req.path==('/login') && !req.path=='/addUser')
    {
    try{
        jwt.verify(req.headers['authorization'],process.env.MY_SECRET)
        next()
    }
    catch{
        res.send("not good the UserToken wrong")
    }
// }
   
} next()} )
app.use(bodyParser.json());
app.use('/',pictureRouter)
app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});