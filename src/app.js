import express from 'express';
import mongoose from 'mongoose';
import Grid from 'gridfs-stream';
import { GridFsStorage } from 'multer-gridfs-storage';
import multer from 'multer';
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import { config } from 'dotenv'
import router from './router/route.js'
import cookieParser from 'cookie-parser'
import credentials from './middleware/credentials.js'
import corsOptions from './config/corsOptions.js'
import mongodb from 'mongodb'
import path from 'path'
import fs from 'fs';
import * as url from 'url';
    const dirname = url.fileURLToPath(new URL('.', import.meta.url));

// import connection file
import connect from './database/conn.js';

const app = express();

// Middleware
app.use(credentials)
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(morgan('tiny'))
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
config()

// Port
const port = process.env.PORT

// // Init gfs
// let gfs;
// conn.once('open', () => {
//   // Init stream
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
// });

// // Create storage engine
// const storage = new GridFsStorage({
//   url: mongoURI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       const filename = file.originalname;
//       const fileInfo = {
//         filename: filename,
//         bucketName: 'uploads',
//       };
//       resolve(fileInfo);
//     });
//   },
// });

// const upload = multer({ storage });

// // ROUTES

app.use('/', router)

// // Example endpoint for uploading a video file
// app.post('/upload', upload.single('video'), (req, res) => {
//   res.json({ message: 'File uploaded successfully' });
// });

app.get('/', (req, res) => {
 try {
  res.json("Successfully accessed '/' route");
 }
 catch (err) {
  res.json(err)
 }
})

connect()

app.listen(port)

