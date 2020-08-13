import { injectable, inject } from 'tsyringe';

import IEquipmentRepository from '@modules/Equipment/repositories/IEquipmentRepository';
import Equipment from '@modules/Equipment/infra/typeorm/entities/Equipment';

interface IRequest {
  user_id: string;
}

@injectable()
class ListEquipmentsByUserService {
  constructor(
    @inject('EquipmentRepository')
    private equipmentRepository: IEquipmentRepository
  ) {}

  public async execute({ user_id }: IRequest): Promise<Equipment[]> {
    const equipments = await this.equipmentRepository.findAllByUser({
      user_id,
    });

    return equipments;
  }
}

export default ListEquipmentsByUserService;
