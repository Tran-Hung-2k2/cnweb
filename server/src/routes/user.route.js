import express from 'express';
import { validate } from 'express-validation';
import vld from '../validations/user.validation.js';
import ctrl from '../controllers/user.controller.js';
import ms from '../services/multer.service.js';
import mdw from '../middlewares/auth.middleware.js';

const route = express.Router();

route.get('/', mdw.verify_admin, ctrl.get_all_user);
route.get('/info', mdw.verify_all_user, ctrl.get_user_info);
route.patch('/', ms.upload.single('Avatar'), mdw.verify_all_user, ctrl.update_user);

export default route;
