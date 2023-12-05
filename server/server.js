import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { ValidationError } from 'express-validation';
import route from './src/routes/index.js';
import api_response from './src/utils/api_response.js';

dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        allowedHeaders: [
            'set-cookie',
            'Content-Type',
            'Access-Control-Allow-Origin',
            'Access-Control-Allow-Credentials',
        ],
    }),
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

route(app);

app.use(function (err, req, res, next) {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err);
    }
    console.log(err);
    return res.status(500).json(api_response(true, 'Có lỗi xảy ra. Vui lòng thử lại sau'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
