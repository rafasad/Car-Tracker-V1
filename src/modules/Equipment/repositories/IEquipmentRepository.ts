import ICreateEquipmentDTO from '@modules/Equipment/dtos/ICreateEquipmentDTO';
import Equipment from '../infra/typeorm/entities/Equipment';
import IFindAllByUserDTO from '../dtos/IFindAllByUserDTO';

export default interface IUsersRepository {
  findAllByUser(data: IFindAllByUserDTO): Promise<Equipment[]>;
  findByDeviceId(device_id: number): Promise<Equipment | undefined>;
  create(data: ICreateEquipmentDTO): Promise<Equipment>;
}
