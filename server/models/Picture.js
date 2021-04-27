const mongoose = require('mongoose')
const pictureSchema = mongoose.Schema({

    date: { type: String },
    explanation: { type: String },
    title: { type: String },
    url: { type: String },
    mediaType:{ type: String },
    uid: { type: mongoose.Types.ObjectId, ref: 'User' }



})
module.exports = mongoose.model('Picture', pictureSchema)