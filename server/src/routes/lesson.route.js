import express from 'express';
import { validate } from 'express-validation';
import vld from '../validations/lesson.validation.js';
import mdw from '../middlewares/auth.middleware.js';
import ctrl from '../controllers/lesson.controller.js';
import ms from '../services/multer.service.js';

const route = express.Router();

route.get('/', validate(vld.get_all_lessons()), mdw.verify_all_user, ctrl.get_all_lessons);
route.post('/', ms.upload.single('Content'), validate(vld.add_lesson()), mdw.verify_admin_and_org, ctrl.add_lesson);
route.patch(
    '/:id',
    ms.upload.single('Content'),
    validate(vld.update_lesson()),
    mdw.verify_admin_and_org,
    ctrl.update_lesson,
);
route.delete('/:id', validate(vld.delete_lesson()), mdw.verify_admin_and_org, ctrl.delete_lesson);

export default route;
