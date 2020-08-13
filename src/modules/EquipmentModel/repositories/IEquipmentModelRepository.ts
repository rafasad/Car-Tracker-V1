import Equipment from '@modules/EquipmentModel/infra/typeorm/entities/EquipmentModel';
import IFindByHeaderDTO from '../dtos/IFindByHeaderDTO';
import ICreateEquipmentModelDTO from '../dtos/ICreateEquipmentModelDTO';

export default interface IAppointmentsRepository {
  findByHeader(data: IFindByHeaderDTO): Promise<Equipment | undefined>;
  create(data: ICreateEquipmentModelDTO): Promise<Equipment>;
}
