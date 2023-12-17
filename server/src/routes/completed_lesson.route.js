import express from 'express';
import { validate } from 'express-validation';
import vld from '../validations/completed_lesson.validation.js';
import mdw from '../middlewares/auth.middleware.js';
import ctrl from '../controllers/completed_lesson.controller.js';

const route = express.Router();

route.post('/', validate(vld.add_completed_lesson()), mdw.verify_user, ctrl.add_completed_lesson);
route.delete('/:id', validate(vld.delete_completed_lesson()), mdw.verify_user, ctrl.delete_completed_lesson);

export default route;
