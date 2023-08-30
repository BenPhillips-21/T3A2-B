import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import { config } from 'dotenv'
import router from './router/route.js'
import cookieParser from 'cookie-parser'
import credentials from './middleware/credentials.js'
import corsOptions from './config/corsOptions.js'
import * as url from 'url';
    const dirname = url.fileURLToPath(new URL('.', import.meta.url));

// import connection file
import connect from './database/conn.js';

const app = express();

// Middleware
app.use(credentials)
app.use(bodyParser.json());
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
config()

const port = process.env.PORT

app.use('/', router)

connect()

app.listen(port)

