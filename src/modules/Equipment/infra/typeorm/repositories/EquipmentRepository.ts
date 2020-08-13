import { getRepository, Repository } from 'typeorm';

import IEquipmentRepository from '@modules/Equipment/repositories/IEquipmentRepository';
import IFindAllByUserDTO from '@modules/Equipment/dtos/IFindAllByUserDTO';
import ICreateEquipmentDTO from '@modules/Equipment/dtos/ICreateEquipmentDTO';

import Equipment from '@modules/Equipment/infra/typeorm/entities/Equipment';

class EquipmentRepository implements IEquipmentRepository {
  private ormRepository: Repository<Equipment>;

  constructor() {
    this.ormRepository = getRepository(Equipment);
  }

  public async create({
    device_id,
    model_id,
    vehicle,
    user_id,
    image,
  }: ICreateEquipmentDTO): Promise<Equipment> {
    const equipment = this.ormRepository.create({
      device_id,
      model_id,
      vehicle,
      user_id,
      image,
    });

    await this.ormRepository.save(equipment);

    return equipment;
  }

  public async findAllByUser({
    user_id,
  }: IFindAllByUserDTO): Promise<Equipment[]> {
    const equipments = await this.ormRepository.find({
      where: {
        user_id,
      },
      relations: ['EquipmentModel'],
    });

    return equipments;
  }

  public async findByDeviceId(
    device_id: number
  ): Promise<Equipment | undefined> {
    const equipment = await this.ormRepository.findOne({
      where: { device_id },
      relations: ['EquipmentModel'],
    });

    return equipment;
  }
}

export default EquipmentRepository;
