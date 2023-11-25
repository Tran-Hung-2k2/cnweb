import express from 'express';
import { validate } from 'express-validation';
import vld from '../validations/lecture.validation.js';
import mdw from '../middlewares/auth.middleware.js';
import ctrl from '../controllers/lecture.controller.js';

const route = express.Router();

route.get('/', mdw.verify_all_user, ctrl.get_all_lectures);
route.get('/:id', mdw.verify_all_user, validate(vld.get_lecture_by_id()), ctrl.get_lecture_by_id);
route.get('/week/:id', mdw.verify_all_user, validate(vld.get_lecture_by_week_id()), ctrl.get_lecture_by_week_id);
route.post('/', validate(vld.add_lecture()), mdw.verify_admin_and_org, ctrl.add_lecture);
route.patch('/:id', validate(vld.update_lecture()), mdw.verify_admin_and_org, ctrl.update_lecture);
route.delete('/:id', validate(vld.delete_lecture()), mdw.verify_admin_and_org, ctrl.delete_lecture);

export default route;
