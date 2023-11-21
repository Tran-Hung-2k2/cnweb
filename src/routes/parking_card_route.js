import express from 'express';
import { validate } from 'express-validation';
import validation from '../validations/parking_card_validation.js';
import middleware from '../middlewares/auth_middlewares.js';
import controller from '../controllers/parking_card_controller.js';
import async_wrap from '../utils/async_wrap.js';

const route = express.Router();

route
    .route('/')
    .get(middleware.verify_admin, async_wrap(controller.get_all_parking_card))
    .post(validate(validation.add_parking_card()), middleware.verify_admin, async_wrap(controller.add_parking_card));

route
    .route('/:id')
    .get(middleware.verify_all_user, async_wrap(controller.get_parking_card_by_id))
    .patch(
        validate(validation.update_parking_card()),
        middleware.verify_admin,
        async_wrap(controller.update_parking_card),
    )
    .delete(middleware.verify_admin, async_wrap(controller.delete_parking_card));

route.route('/user/:id').get(middleware.verify_admin_and_user, async_wrap(controller.get_parking_card_by_user));

export default route;
