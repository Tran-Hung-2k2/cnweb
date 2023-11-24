import express from 'express';
import mdw from '../middlewares/auth.middleware.js';
import ctrl from '../controllers/lesson.controller.js';
import upload from '../services/multer.service.js';

const route = express.Router();


export default route;
