import FakeLocalizationsRepository from '@modules/localizations/repositories/fakes/FakeLocalizationsRepository';
import { date } from '@hapi/joi';
import ListEquipmentLocalization from './ListEquipmentLocalization';

let fakeLocalizationsRepository: FakeLocalizationsRepository;
let listEquipmentLocalization: ListEquipmentLocalization;

describe('List Equipment by user_id', () => {
  beforeEach(() => {
    fakeLocalizationsRepository = new FakeLocalizationsRepository();

    listEquipmentLocalization = new ListEquipmentLocalization(
      fakeLocalizationsRepository
    );
  });

  it('should be able to list the Equipaments', async () => {
    const now = new Date();

    const equipmentInserted1 = await fakeLocalizationsRepository.create({
      device_id: '456456',
      currentSpeed: 75,
      date: now,
      direction: 5212,
      distancy: 2500000,
      fixedGPS: true,
      historicGPS: true,
      ignitionOn: true,
      reportingTime: 3000005,
      latitude: -19957413,
      longitude: -43916847,
    });

    const equipments = await listEquipmentLocalization.execute({
      device_id: '456456',
    });

    expect(equipments).toEqual(equipmentInserted1);
  });
});
