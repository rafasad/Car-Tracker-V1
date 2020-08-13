import FakeEquipmentRepository from '@modules/Equipment/repositories/fakes/FakeEquipmentRepository';
import FakeLocalizationsRepository from '@modules/localizations/repositories/fakes/FakeLocalizationsRepository';
import AppError from '@shared/error/AppError';
import SFT9001Service from './SFT9001Service';

let fakeEquipmentRepository: FakeEquipmentRepository;
let fakeLocalizationsRepository: FakeLocalizationsRepository;
let sft9001Service: SFT9001Service;

describe('SFT9001', () => {
  beforeEach(() => {
    fakeEquipmentRepository = new FakeEquipmentRepository();
    fakeLocalizationsRepository = new FakeLocalizationsRepository();

    sft9001Service = new SFT9001Service(
      fakeEquipmentRepository,
      fakeLocalizationsRepository
    );
  });

  it('should be able add to location', async () => {
    await fakeEquipmentRepository.create({
      device_id: 671603,
      model_id: 's45',
      user_id: 'user-id',
      vehicle: 'corsa',
      image: 'img',
    });

    const equipment = await sft9001Service.execute({
      packageData:
        '50F70A3F73025EFCF950156F017D784000008CA0F80084003C013026A1029E72BD73C4',
    });

    expect(equipment).toEqual({ heartbeat: false, response: undefined });
  });

  it('should be able ping and reveice the heartbeat', async () => {
    await fakeEquipmentRepository.create({
      device_id: 671603,
      model_id: 's45',
      user_id: 'user-id',
      vehicle: 'corsa',
      image: 'img',
    });

    const equipment = await sft9001Service.execute({
      packageData: '50F70A3F730150494E4773C4',
    });

    expect(equipment).toEqual({
      heartbeat: true,
      response: '50F70150494E4773C4',
    });
  });

  it('should not be able to do nothing', async () => {
    await fakeEquipmentRepository.create({
      device_id: 671603,
      model_id: 's45',
      user_id: 'user-id',
      vehicle: 'corsa',
      image: 'img',
    });

    await expect(
      sft9001Service.execute({
        packageData: '50F71A3F730150494E4773C4',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
