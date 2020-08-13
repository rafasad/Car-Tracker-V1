import IEquipmentModelRepository from '@modules/EquipmentModel/repositories/IEquipmentModelRepository';
import IFindByHeaderDTO from '@modules/EquipmentModel/dtos/IFindByHeaderDTO';
import EquipmentModel from '@modules/EquipmentModel/infra/typeorm/entities/EquipmentModel';
import ICreateEquipmentModelDTO from '@modules/EquipmentModel/dtos/ICreateEquipmentModelDTO';
import { uuid } from 'uuidv4';

class FakeEquipmentModelRepository implements IEquipmentModelRepository {
  private equipments: EquipmentModel[] = [];

  public async create(data: ICreateEquipmentModelDTO): Promise<EquipmentModel> {
    const equipment = new EquipmentModel();

    Object.assign(equipment, { id: uuid() }, data);

    this.equipments.push(equipment);

    return equipment;
  }

  public async findByHeader({
    header,
  }: IFindByHeaderDTO): Promise<EquipmentModel | undefined> {
    const findEquipment = this.equipments.find(
      equip => equip.header === header
    );

    return findEquipment;
  }
}

export default FakeEquipmentModelRepository;
