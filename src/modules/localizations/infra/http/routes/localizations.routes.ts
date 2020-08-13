import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ListEquipmentLocationEquipmentController from '../controllers/ListEquipmentLocationEquipmentController';

const localizationRouter = Router();
const listEquipmentLocationEquipmentController = new ListEquipmentLocationEquipmentController();

localizationRouter.use(ensureAuthenticated);

localizationRouter.get(
  '/:device_id/',
  celebrate({
    [Segments.PARAMS]: {
      device_id: Joi.string().required(),
    },
  }),
  listEquipmentLocationEquipmentController.index
);

export default localizationRouter;
