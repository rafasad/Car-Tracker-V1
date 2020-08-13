import FakeEquipmentModelRepository from '../repositories/fakes/FakeEquipmentModelRepository';
import CheckEquipmentModelService from './CheckEquipmentModelService';

let fakeEquipmentModelRepository: FakeEquipmentModelRepository;
let checkEquipmentModelService: CheckEquipmentModelService;

describe('checkEquipment', () => {
  beforeEach(() => {
    checkEquipmentModelService = new CheckEquipmentModelService(
      fakeEquipmentModelRepository
    );
  });

  it('should be able accept', async () => {
    await fakeEquipmentModelRepository.create({
      header: '50F7',
      name: 'SFT9001',
    });

    const response = await checkEquipmentModelService.execute({
      header: '50F7',
    });

    expect(response.allowed).toEqual(true);
    expect(response.model).toEqual('SFT9001');
  });

  it('should not be able accept', async () => {
    await expect(
      checkEquipmentModelService.execute({
        header: 'dont-exist',
      })
    ).rejects.toBeInstanceOf(TypeError);
  });
});
