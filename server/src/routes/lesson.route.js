import express from 'express';
import mdw from '../middlewares/auth.middleware.js';
import ctrl from '../controllers/lesson.controller.js';
import multer_service from '../services/multer.service.js';

const route = express.Router();


export default route;
