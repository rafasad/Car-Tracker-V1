import FakeEquipmentRepository from '@modules/Equipment/repositories/fakes/FakeEquipmentRepository';
import ListEquipmentsByUserService from './ListEquipmentsByUserService';

let fakeEquipmentRepository: FakeEquipmentRepository;
let listEquipment: ListEquipmentsByUserService;

describe('List Equipment by user_id', () => {
  beforeEach(() => {
    fakeEquipmentRepository = new FakeEquipmentRepository();

    listEquipment = new ListEquipmentsByUserService(fakeEquipmentRepository);
  });

  it('should be able to list the Equipaments', async () => {
    const equipmentInserted1 = await fakeEquipmentRepository.create({
      device_id: 456456,
      model_id: 's45',
      user_id: 'user-id',
      vehicle: 'corsa',
      image: 'img',
    });

    const equipmentInserted2 = await fakeEquipmentRepository.create({
      device_id: 456456,
      model_id: 's45',
      user_id: 'user-id',
      vehicle: 'corsa',
      image: 'img',
    });

    const equipments = await listEquipment.execute({
      user_id: 'user-id',
    });

    expect(equipments).toEqual([equipmentInserted1, equipmentInserted2]);
  });
});
