import express from 'express';
import { validate } from 'express-validation';
import vld from '../validations/week.validation.js';
import mdw from '../middlewares/auth.middleware.js';
import ctrl from '../controllers/week.controller.js';

const route = express.Router();

export default route;
