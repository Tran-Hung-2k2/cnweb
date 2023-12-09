import express from 'express';
import { validate } from 'express-validation';
import vld from '../validations/week.validation.js';
import mdw from '../middlewares/auth.middleware.js';
import ctrl from '../controllers/week.controller.js';

const route = express.Router();

route.get('/', validate(vld.get_all_weeks()), ctrl.get_all_weeks);
route.post('/', validate(vld.add_week()), mdw.verify_admin_and_org, ctrl.add_week);
route.patch('/:id', validate(vld.update_week()), mdw.verify_admin_and_org, ctrl.update_week);
route.delete('/:id', validate(vld.delete_week()), mdw.verify_admin_and_org, ctrl.delete_week);

export default route;
