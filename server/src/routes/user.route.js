import express from 'express';
import { validate } from 'express-validation';
// import vld from '../validations/user.validation.js';
import ctrl from '../controllers/user.controller.js';
import ms from '../services/multer.service.js';
import mdw from '../middlewares/auth.middleware.js';

const route = express.Router();

route.get('/', ctrl.get_all_user);
route.get('/:id', ctrl.get_user_by_id);
route.patch(
    '/:id',
    ms.upload.single('Image'),
    mdw.verify_admin_and_org,
    ctrl.update_user,
);
route.delete('/:id', validate(vld.get_course_by_id()), mdw.verify_admin_and_org, ctrl.delete_course);


export default route;