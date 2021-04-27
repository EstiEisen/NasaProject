const User = require('../models/user')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const nodeMailer = require('nodemailer')

dotenv.config();
//sign in to with email and password
const login = async (req, res) => {
    try {
        const theUser = await User.findOne({ $and: [{ mail: req.params.mail }, { password: req.params.password }] })
        console.log(theUser)
        const token = jwt.sign({ name: theUser.name, password: theUser.password }, process.env.MY_SECRET)
        // res.setHeader('Set-Cookie', `jwt=${token}; HttpOnly`, 'domain = localhost//:4000');
        res.status(200).json({user:theUser,jwt:token})
    }
    catch {
        res.status(400).send("not found the user -plese try again")
    }


}
//add user 
const addUser = async (req, res) => {
    try {
        const currentUser = new User(req.body)
        await currentUser.save()
        console.log("!!", currentUser)
        await sendmail(req.body.mail, req.body.name)
        res.status(200).send(currentUser)

    }
    catch {
        res.status(404).send("error in register")
    }



}







function sendmail(email, name) {
    console.log(name)
    var transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'estieisen@gmail.com',
            pass: '318750858'
        }
    });

    console.log("transporter : ", transporter)

    var mailOptions = {
        from: 'estieisen@gmail.com',
        to: email,
        subject: 'wellcom',
        text: `hello ${name}`
    };

    console.log("mailOptions : ", mailOptions)

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("error");
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = { addUser, login }
