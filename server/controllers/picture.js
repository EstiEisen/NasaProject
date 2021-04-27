const Picture = require("../models/Picture")
const request = require("request")
const User = require('../models/user')
const path = require("path")
//get the "todaypicture" from nasa api and add to the user history
const getPicture = async (req, res) => {
    let thePicture = await getTodayPicture(req, res);
    thePicture = JSON.parse(thePicture)
    let picture = new Picture();
    picture.uid = req.params.uid;
    picture.date = thePicture.date;
    picture.madiaType= thePicture.media_type;
    picture.explanation = thePicture.explanation;
    picture.title = thePicture.title;
    picture.url = thePicture.url;
    await User.findByIdAndUpdate({ _id: req.params.uid }, { $push: { 'picturesList': picture._id } })

    picture.save().then(
        res.status(200).send(picture)).catch((error) => res.status(400).send(error))
}
//delete on picture from the history of the user
const deleteFromHistory= async(req,res)=>{
    const thePicture=Picture.findById({_id:req.params.pid})
    try {
        await User.findByIdAndUpdate({ _id: req.params.uid }, { $pull: { 'picturesList': thePicture._id} })
        await Picture.findByIdAndDelete({ _id: req.params.pid })
  
        res.status(200).send("delete succsfull!")
    }
    catch {
        res.status(400).send("cant delete")
        console.log("delete")
    }
}
//add picture to the user history
const addPicture = async (req, res) => {
    console.log("in add picture")
    try {
        console.log("body:   " + req.body)
        console.log("files:   " + req.files)
        if (req.files && req.files.picture) {
            console.log(req.files.picture)
            const pic = req.files.picture;
            const newpath = path.join(
                __dirname,
                "../images",
                pic.name
            );
            pic.mv(newpath).then(async (success) => {
                const thePicture = new Picture(req.body)
                console.log("name!! "+pic.name)
                thePicture.url = "http://localhost:4000/"+pic.name;
                thePicture.date = Date.now();
                thePicture.uid = req.body.uid

                 await User.findByIdAndUpdate({ _id: thePicture.uid},{ $push: { 'picturesList': thePicture._id } })
                await thePicture.save()
                res.status(200).send(thePicture)
            })
        }

        else res.status(404).send("no files found")
    }
    catch {
        res.status(500).send("error in adding picture")
    }



}
display = (req, res) => {
    res.sendFile(path.join(__dirname, "../images/", req.params.fileName));
};
//return all the pictures in the history of the user
const getPictureHistory = async (req, res) => {
    console.log("getPictureHistory");
    try {
        const pictureHistory = await Picture.find({ "uid": req.params.uid });
        console.log(JSON.stringify(pictureHistory))
        res.status(200).send(pictureHistory);
    }
    catch {
        res.status(400).send("error")
    }
}

getTodayPicture = (req, res) => {
    return new Promise((resolve, reject) => {
        const url = "https://api.nasa.gov/planetary/apod?api_key=tpTX89AOdhCXke1Kwzj7alridHLK7HygDg1Qjaej"
        request(url, function (error, response, body) {
            if (error)
                reject(error);
            else
                resolve(body);
        });

    })
}
module.exports = { addPicture, getPictureHistory, getPicture,deleteFromHistory, display }