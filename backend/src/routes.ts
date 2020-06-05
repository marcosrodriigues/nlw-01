import express from 'express';
import { celebrate, Joi } from 'celebrate';

import multer from 'multer';
import MulterConfig from './config/multer';

import PointsController from './controller/PointsController';
import ItemsController from './controller/ItemsController';

const routes = express.Router();
const upload = multer(MulterConfig);

const pointController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);
routes.get('/points', pointController.index);
routes.get('/points/:id', pointController.show);
routes.delete('/points/:id', pointController.delete)

routes.post(
    '/points', 
    upload.single('image'), 
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().max(2).required(),
            items: Joi.string().required()
        })
    }, {
        abortEarly: false
    }),
    pointController.create);

export default routes;