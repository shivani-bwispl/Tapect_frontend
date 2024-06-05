// const express = require('express');
// const multer = require('multer');
// const path = require('path');

// const app = express();

// // Set up multer for file upload
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // specify the directory where files will be stored
//     },
//     filename: function (req, file, cb) {
//         // generate a unique filename to prevent overwriting
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: storage });

// // POST endpoint for file upload
// app.post('/upload', upload.single('file'), (req, res) => {
//     try {
//         // Check if file was uploaded successfully
//         if (!req.file) {
//             return res.status(400).json({ error: 'No file uploaded' });
//         }

//         // File uploaded successfully, return the file path
//         const filePath = req.file.path;
//         res.json({ filePath: filePath });
//     } catch (error) {
//         console.error('Error uploading file:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// // // Start the server
// // const PORT = process.env.PORT || 3000;
// // app.listen(PORT, () => {
// //     console.log(`Server is running on port ${PORT}`);
// // });

const imagepathURL = "http://localhost:3001"

export {imagepathURL}