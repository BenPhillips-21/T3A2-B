import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import router from './router/route.js';
import cookieParser from 'cookie-parser';
import * as url from 'url';
const dirname = url.fileURLToPath(new URL('.', import.meta.url));

// Import the connection file
import connect from './database/conn.js';

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(express.json()); // Parse JSON request bodies (alternative)
app.use(cookieParser()); // Parse cookies
config(); // Load environment variables from .env file

const port = process.env.PORT;

app.use('/', router); // Use the router for handling routes

connect(); // Establish a connection to the database

app.listen(port); // Start the server

export default app; // Export the Express app for external use
