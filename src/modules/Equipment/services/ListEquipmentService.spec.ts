import FakeEquipmentRepository from '@modules/Equipment/repositories/fakes/FakeEquipmentRepository';
import AppError from '@shared/error/AppError';
import ListEquipmentService from './ListEquipmentService';

let fakeEquipmentRepository: FakeEquipmentRepository;
let listEquipment: ListEquipmentService;

describe('List Equipment by device_id', () => {
  beforeEach(() => {
    fakeEquipmentRepository = new FakeEquipmentRepository();

    listEquipment = new ListEquipmentService(fakeEquipmentRepository);
  });

  it('should be able to list the Equipament', async () => {
    const device_id = 456456;

    const equipmentInsert = await fakeEquipmentRepository.create({
      device_id,
      model_id: 's45',
      user_id: 'user-id',
      vehicle: 'corsa',
      image: 'img',
    });

    const equipment = await listEquipment.execute({
      device_id,
    });

    expect(equipment).toEqual(equipmentInsert);
  });

  it('should not be able to list the Equipament', async () => {
    const device_id = 456456;

    await fakeEquipmentRepository.create({
      device_id,
      model_id: 's45',
      user_id: 'user-id',
      vehicle: 'corsa',
      image: 'img',
    });

    await expect(
      await listEquipment.execute({
        device_id: 11,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
