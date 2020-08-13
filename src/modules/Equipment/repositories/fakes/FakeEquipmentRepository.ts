import { uuid } from 'uuidv4';

import IEquipmentRepository from '@modules/Equipment/repositories/IEquipmentRepository';
import IFindAllByUserDTO from '@modules/Equipment/dtos/IFindAllByUserDTO';
import ICreateEquipmentDTO from '@modules/Equipment/dtos/ICreateEquipmentDTO';

import Equipment from '@modules/Equipment/infra/typeorm/entities/Equipment';
import AppError from '@shared/error/AppError';

class EquipmentRepository implements IEquipmentRepository {
  private equipments: Equipment[] = [];

  public async create({
    device_id,
    image,
    model_id,
    user_id,
    vehicle,
  }: ICreateEquipmentDTO): Promise<Equipment> {
    const equipment = new Equipment();

    Object.assign(equipment, {
      id: uuid(),
      device_id,
      image,
      model_id,
      user_id,
      vehicle,
    });

    this.equipments.push(equipment);

    return equipment;
  }

  public async findByDeviceId(
    device_id: number
  ): Promise<Equipment | undefined> {
    const findDevice = this.equipments.find(
      equip => equip.device_id === device_id
    );

    if (!findDevice) {
      throw new AppError('Equipment not found', 401);
    }

    return findDevice;
  }

  public async findAllByUser({
    user_id,
  }: IFindAllByUserDTO): Promise<Equipment[]> {
    const devices = this.equipments.filter(equip => equip.user_id === user_id);

    return devices;
  }
}

export default EquipmentRepository;
