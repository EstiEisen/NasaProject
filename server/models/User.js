const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name: { type: String },
    mail: { type: String },
    password: { type: String },
    picturesList: [{ type: mongoose.Types.ObjectId, ref: 'Picture' }],

})
module.exports = mongoose.model('User', userSchema)