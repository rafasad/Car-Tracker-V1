import { getRepository, Repository } from 'typeorm';

import IEquipmentModelRepository from '@modules/EquipmentModel/repositories/IEquipmentModelRepository';
import Equipment from '@modules/EquipmentModel/infra/typeorm/entities/EquipmentModel';
import IFindByHeaderDTO from '@modules/EquipmentModel/dtos/IFindByHeaderDTO';
import ICreateEquipmentModelDTO from '@modules/EquipmentModel/dtos/ICreateEquipmentModelDTO';

class EquipmentModelRepository implements IEquipmentModelRepository {
  private ormRepository: Repository<Equipment>;

  constructor() {
    this.ormRepository = getRepository(Equipment);
  }

  public async create(data: ICreateEquipmentModelDTO): Promise<Equipment> {
    const EquipmentModel = this.ormRepository.create(data);

    await this.ormRepository.save(EquipmentModel);

    return EquipmentModel;
  }

  async findByHeader({
    header,
  }: IFindByHeaderDTO): Promise<Equipment | undefined> {
    const equipment = await this.ormRepository.findOne({
      where: { header },
    });

    return equipment;
  }
}

export default EquipmentModelRepository;
