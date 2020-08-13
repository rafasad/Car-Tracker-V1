import { Router } from 'express';

import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import localizations from '@modules/localizations/infra/http/routes/localizations.routes';
import equipments from '@modules/Equipment/infra/http/routes/equipments.routes';

const routes = Router();

routes.use('/api/v1/sessions', sessionsRouter);
routes.use('/api/v1/location', localizations);
routes.use('/api/v1/equipment', equipments);

export default routes;
