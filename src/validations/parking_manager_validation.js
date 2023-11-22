import { Joi } from 'express-validation';

const validation = {
    // [POST] api/parking_manager/
    add_parking_manager: () => ({
        body: Joi.object({
            User_ID: Joi.string().required(),
            Parking_ID: Joi.string().required(),
        }),
    }),

    // [PUT] api/parking_manager/:user_id/:parking_id
    update_parking_manager: () => ({
        body: Joi.object({
            Is_Managing: Joi.boolean().required(),
        }),
    }),
};

export default validation;
