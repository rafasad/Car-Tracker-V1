import ICreateLocalizationDTO from '../dtos/ICreateLocalizationDTO';
import Localization from '../infra/typeorm/schemas/Localization';

export default interface ILocalizationsRepository {
  create(data: ICreateLocalizationDTO): Promise<Localization>;
  findLocation(device_id: string): Promise<Localization | undefined>;
}
