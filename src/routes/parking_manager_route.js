import express from 'express';
import { validate } from 'express-validation';
import validation from '../validations/parking_manager_validation.js';
import middleware from '../middlewares/auth_middlewares.js';
import controller from '../controllers/parking_manager_controller.js';

const route = express.Router();

route
    .route('/')
    .get(middleware.verify_admin, controller.get_all_parking_manager)
    .post(validate(validation.add_parking_manager()), middleware.verify_admin, controller.add_parking_manager);

route
    .route('/:user_id/:parking_id')
    .patch(
        validate(validation.update_parking_manager()),
        middleware.verify_admin_and_manager,
        controller.update_parking_manager,
    )
    .delete(middleware.verify_admin, controller.delete_parking_manager);

export default route;
