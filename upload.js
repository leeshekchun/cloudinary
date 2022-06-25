const path = require('path');
const express = require('express');
const cloudinary = require('cloudinary').v2
require('dotenv').config()

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,
  secure: true
});

const fileUpload = require('express-fileupload')
const PORT = 3001;

const app = express();

app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));


app.post('/api/images', (req, res) => {
const uploadedImg = req.files.image
console.log(uploadedImg)
const options = {width: 150, height: 150, crop: "scale", folder: "petsagram"}

cloudinary.uploader.upload(uploadedImg.tempFilePath, options, function(error, result) {
  const imgUrl = result.url
console.log(imgUrl)
});
})

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/index.html'))
);

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);