import express from 'express';
import { validate } from 'express-validation';
import validation from '../validations/parking_validation.js';
import middleware from '../middlewares/auth_middlewares.js';
import controller from '../controllers/parking_controller.js';
import async_wrap from '../utils/async_wrap.js';

const route = express.Router();

route
    .route('/')
    .get(middleware.verify_admin, async_wrap(controller.get_all_parking))
    .post(validate(validation.add_parking()), middleware.verify_admin, async_wrap(controller.add_parking));

route
    .route('/:id')
    .patch(
        validate(validation.update_parking()),
        middleware.verify_admin_and_manager,
        async_wrap(controller.update_parking),
    )
    .delete(middleware.verify_admin, async_wrap(controller.delete_parking));

export default route;
