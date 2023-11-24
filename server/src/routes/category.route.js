import express from 'express';
import { validate } from 'express-validation';
import vld from '../validations/category.validation.js';
import mdw from '../middlewares/auth.middleware.js';
import ctrl from '../controllers/category.controller.js';

const route = express.Router();

route.get('/', ctrl.get_all_categories);
route.get('/:id', validate(vld.get_category_by_id()), ctrl.get_category_by_id);
route.post('/', validate(vld.add_category()), mdw.verify_admin, ctrl.add_category);
route.patch('/:id', validate(vld.update_category()), mdw.verify_admin, ctrl.update_category);
route.delete('/:id', validate(vld.get_category_by_id()), mdw.verify_admin, ctrl.delete_category);

export default route;
