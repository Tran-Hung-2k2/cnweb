import express from 'express';
import { validate } from 'express-validation';
import vld from '../validations/course.validation.js';
import mdw from '../middlewares/auth.middleware.js';
import ctrl from '../controllers/course.controller.js';
import multer_service from '../services/multer.service.js';

const route = express.Router();

route.get('/', ctrl.get_all_courses);
route.get('/:id', validate(vld.get_course_by_id()), ctrl.get_course_by_id);
route.post(
    '/',
    multer_service.upload.single('Image'),
    validate(vld.add_course()),
    mdw.verify_admin_and_org,
    ctrl.add_course,
);
route.patch(
    '/:id',
    multer_service.upload.single('Image'),
    validate(vld.update_course()),
    mdw.verify_admin_and_org,
    ctrl.update_course,
);
route.delete('/:id', validate(vld.get_course_by_id()), mdw.verify_admin_and_org, ctrl.delete_course);

export default route;
