import { injectable, inject } from 'tsyringe';

import ILocalizationsRepository from '@modules/localizations/repositories/ILocalizationsRepository';
import Localization from '@modules/localizations/infra/typeorm/schemas/Localization';

interface IRequest {
  device_id: string;
}

@injectable()
class ListEquipmentLocalization {
  constructor(
    @inject('LocalizationsRepository')
    private localizationsRepository: ILocalizationsRepository
  ) {}

  public async execute({
    device_id,
  }: IRequest): Promise<Localization | undefined> {
    const location = await this.localizationsRepository.findLocation(device_id);

    return location;
  }
}

export default ListEquipmentLocalization;
