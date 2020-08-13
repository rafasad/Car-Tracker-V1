import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListEquipmentLocalization from '@modules/localizations/services/ListEquipmentLocalization';

export default class ListEquipmentLocationEquipmentController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { device_id } = request.params;

    const listEquipmentLocalization = container.resolve(
      ListEquipmentLocalization
    );

    const localizationData = await listEquipmentLocalization.execute({
      device_id,
    });

    return response.json(localizationData);
  }
}
