import ILocalizationsRepository from '@modules/localizations/repositories/ILocalizationsRepository';
import ICreateLocalizationDTO from '@modules/localizations/dtos/ICreateLocalizationDTO';
import Localization from '@modules/localizations/infra/typeorm/schemas/Localization';

import { ObjectID } from 'mongodb';

class LocalizationsRepository implements ILocalizationsRepository {
  private localizations: Localization[] = [];

  public async findLocation(
    device_id: string
  ): Promise<Localization | undefined> {
    const localization = this.localizations.find(
      local => local.device_id === device_id
    );
    return localization;
  }

  public async create({
    device_id,
    currentSpeed,
    date,
    reportingTime,
    longitude,
    latitude,
    ignitionOn,
    historicGPS,
    fixedGPS,
    distancy,
    direction,
  }: ICreateLocalizationDTO): Promise<Localization> {
    const localization = new Localization();

    Object.assign(localization, {
      id: new ObjectID(),
      currentSpeed,
      date,
      reportingTime,
      longitude,
      latitude,
      ignitionOn,
      historicGPS,
      fixedGPS,
      distancy,
      direction,
      device_id,
    });

    this.localizations.push(localization);

    return localization;
  }
}

export default LocalizationsRepository;
