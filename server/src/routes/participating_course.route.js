import express from 'express';
import { validate } from 'express-validation';
import vld from '../validations/participating_course.validation.js';
import ctrl from '../controllers/participating_course.controller.js';
import mdw from '../middlewares/auth.middleware.js';

const route = express.Router();

route.get('/', validate(vld.get_all_participating_courses()), mdw.verify_user, ctrl.get_all_participating_courses);
route.get('/org', mdw.verify_admin_and_org, ctrl.get_participating_courses_org);
route.post('/', validate(vld.add_participating_course()), mdw.verify_user, ctrl.add_participating_course);
route.patch(
    '/:course_id',
    validate(vld.update_participating_course()),
    mdw.verify_user,
    ctrl.update_participating_course,
);
route.patch(
    '/status/:user_id/:course_id',
    validate(vld.update_participating_course_status()),
    mdw.verify_admin_and_org,
    ctrl.update_participating_course_status,
);
route.delete(
    '/:user_id/:course_id',
    validate(vld.delete_participating_course()),
    mdw.verify_all_user,
    ctrl.delete_participating_course,
);

export default route;
