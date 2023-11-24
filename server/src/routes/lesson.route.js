import express from 'express';
import mdw from '../middlewares/auth.middleware.js';
import ctrl from '../controllers/parking_record.controller.js';
import upload from './src/services/multer.service.js';

const route = express.Router();

route.post('/', mdw.verify_org, upload.single('video'), ctrl.add_lesson);

export default route;
