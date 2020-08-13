import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListEquipmentsByUserService from '@modules/Equipment/services/ListEquipmentsByUserService';

export default class ListEquipmentsByUserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listEquipment = container.resolve(ListEquipmentsByUserService);

    const listEquipments = await listEquipment.execute({
      user_id: request.user.id,
    });

    return response.json(listEquipments);
  }
}
