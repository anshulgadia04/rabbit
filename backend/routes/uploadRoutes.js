const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const dotenv = require('dotenv');

dotenv.config();


// Set up cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post('/' , upload.single('image'), async (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).send('No file uploaded');
        }

        // function to handle the stream to upload to cloudinary
        const streamUpload = (filebuffer) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                    (error, result) => {
                        if(result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );

                
                streamifier.createReadStream(filebuffer).pipe(stream);
            });
        } 


        const result = await streamUpload(req.file.buffer);

        res.status(200).json({
            imageURI: result.secure_url,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;