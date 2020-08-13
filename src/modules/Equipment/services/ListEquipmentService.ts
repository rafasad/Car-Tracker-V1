import { injectable, inject } from 'tsyringe';

import AppError from '@shared/error/AppError';
import IEquipmentRepository from '@modules/Equipment/repositories/IEquipmentRepository';
import Equipment from '@modules/Equipment/infra/typeorm/entities/Equipment';

interface IRequest {
  device_id: number;
}

@injectable()
class ListEquipmentService {
  constructor(
    @inject('EquipmentRepository')
    private equipmentRepository: IEquipmentRepository
  ) {}

  public async execute({ device_id }: IRequest): Promise<Equipment> {
    const equipment = await this.equipmentRepository.findByDeviceId(device_id);

    if (!equipment) {
      throw new AppError('Equipment not found');
    }

    return equipment;
  }
}

export default ListEquipmentService;
