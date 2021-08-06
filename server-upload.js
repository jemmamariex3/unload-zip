const express = require('express');
const multer = require('multer');
const uuid = require('uuid').v4;
const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        // or 
        // uuid, or fieldname
        cb(null, originalname); //allows to customize the file name in whatever way we'd like
    }
});
const upload = multer({storage});

app.use(express.static('public'))
app.post('/upload', upload.array('avatar'), (req, res) => { //array allows us to upload multiple files
    return res.json({ status: 'OK', uploaded: req.files.length }); //uploaded: tells us how many files uploaded
});

app.listen(3001, () => console.log('App is listening...'));