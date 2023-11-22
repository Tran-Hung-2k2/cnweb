import express from 'express';
import { validate } from 'express-validation';
import validation from '../validations/auth_validation.js';
import controller from '../controllers/auth_controller.js';

const route = express.Router();

route.post('/register', validate(validation.register()), controller.register);
route.post('/login', validate(validation.login()), controller.login);
route.post('/change_password', validate(validation.change_password()), controller.change_password);
route.post('/forget_password', validate(validation.forget_password()), controller.forget_password);
route.get('/verify_forget_password', controller.verify_forget_password);
route.post('/logout', controller.logout);
route.post('/refresh_token', validate(validation.refresh_token()), controller.refresh_token);

export default route;
