import express from 'express';
import middleware from '../middlewares/auth_middlewares.js';
import controller from '../controllers/parking_record_controller.js';

const route = express.Router();

route.get('/', middleware.verify_admin, controller.get_all_parking_record);
route.post('/', middleware.verify_manager, controller.add_parking_record);

export default route;
