import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListEquipment from '@modules/Equipment/services/ListEquipmentService';

export default class ListEquipmentLocationEquipmentController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { device_id } = request.params;
    const deviceIdNumber = Number(device_id);
    const listEquipment = container.resolve(ListEquipment);

    const listEquipmentData = await listEquipment.execute({
      device_id: deviceIdNumber,
    });

    return response.json(listEquipmentData);
  }
}
