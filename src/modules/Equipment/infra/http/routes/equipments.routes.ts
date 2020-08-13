import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ListEquipmentsByUserController from '../controllers/ListEquipmentsByUserController';
import ListEquipmentsController from '../controllers/ListEquipmentsController';

const localizationRouter = Router();
const listEquipmentsByUserController = new ListEquipmentsByUserController();
const listEquipmentsController = new ListEquipmentsController();

localizationRouter.use(ensureAuthenticated);

localizationRouter.get('/my/', listEquipmentsByUserController.index);

localizationRouter.get(
  '/:device_id/',
  celebrate({
    [Segments.PARAMS]: {
      device_id: Joi.string().required(),
    },
  }),
  listEquipmentsController.index
);

export default localizationRouter;
