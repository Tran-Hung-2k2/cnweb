import express from 'express';
import { validate } from 'express-validation';
// import vld from '../validations/user.validation.js';
import ctrl from '../controllers/user.controller.js';

const route = express.Router();

route.get('/', ctrl.getAllUser);


export default route;