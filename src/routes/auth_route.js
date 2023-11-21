import express from 'express';
import { validate } from 'express-validation';
import validation from '../validations/auth_validation.js';
import controller from '../controllers/auth_controller.js';
import async_wrap from '../utils/async_wrap.js';

const route = express.Router();

route.post('/register', validate(validation.register()), async_wrap(controller.register));
route.post('/login', validate(validation.login()), async_wrap(controller.login));
route.post('/change_password', validate(validation.change_password()), async_wrap(controller.change_password));
route.post('/forget_password', validate(validation.forget_password()), async_wrap(controller.forget_password));
route.get('/verify_forget_password', async_wrap(controller.verify_forget_password));
route.post('/logout', async_wrap(controller.logout));
route.post('/refresh_token', validate(validation.refresh_token()), async_wrap(controller.refresh_token));

export default route;
