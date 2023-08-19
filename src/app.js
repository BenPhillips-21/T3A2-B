import express from 'express';
import mongoose from 'mongoose';
import Grid from 'gridfs-stream';
import { GridFsStorage } from 'multer-gridfs-storage';
import multer from 'multer';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import mongodb from 'mongodb'
import path from 'path'
import fs from 'fs';
import * as url from 'url';
    const dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// Mongo URI
const mongoURI = 'mongodb+srv://HolidayGuy:Madcows1@clusterbuster.qerfih6.mongodb.net/journal?retryWrites=true&w=majority';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;
conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: 'uploads',
      };
      resolve(fileInfo);
    });
  },
});

const upload = multer({ storage });

// Example endpoint for uploading a video file
app.post('/upload', upload.single('video'), (req, res) => {
  res.json({ message: 'File uploaded successfully' });
});

const port = 9000
app.listen(port)
