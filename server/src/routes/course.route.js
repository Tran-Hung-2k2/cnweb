import express from 'express';
import { validate } from 'express-validation';
import vld from '../validations/course.validation.js';
import mdw from '../middlewares/auth.middleware.js';
import ctrl from '../controllers/course.controller.js';
import ms from '../services/multer.service.js';

const route = express.Router();

route.get('/', validate(vld.get_all_courses()), ctrl.get_all_courses);
route.get('/detail', validate(vld.get_course_detail()), ctrl.get_course_detail);
route.post('/', ms.upload.single('Image'), validate(vld.add_course()), mdw.verify_admin_and_org, ctrl.add_course);
route.patch(
    '/:id',
    ms.upload.single('Image'),
    validate(vld.update_course()),
    mdw.verify_admin_and_org,
    ctrl.update_course,
);
route.delete('/:id', validate(vld.delete_course()), mdw.verify_admin_and_org, ctrl.delete_course);

export default route;
