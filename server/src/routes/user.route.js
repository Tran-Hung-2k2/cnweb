import express from 'express';
import { validate } from 'express-validation';
// import vld from '../validations/user.validation.js';
import ctrl from '../controllers/user.controller.js';

const route = express.Router();

route.get('/', ctrl.get_all_user);
route.get('/:id', ctrl.get_user_by_id)


export default route;