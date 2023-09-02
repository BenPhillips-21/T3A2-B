import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import { config } from 'dotenv'
import router from './router/route.js'
import cookieParser from 'cookie-parser'
import * as url from 'url';
    const dirname = url.fileURLToPath(new URL('.', import.meta.url));

// import connection file
import connect from './database/conn.js';

const app = express();


// Middleware
app.use(cors())
app.use(bodyParser.json());
app.use(express.json())
app.use(cookieParser())
config()

const port = process.env.PORT

app.use('/', router)

connect()

app.listen(port)

export default app

