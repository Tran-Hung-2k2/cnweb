import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import route from './routes/index.js';

dotenv.config();
const PORT = process.env.PORT || 8000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

route(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
