import { getMongoRepository, MongoRepository } from 'typeorm';

import ILocalizationsRepository from '@modules/localizations/repositories/ILocalizationsRepository';
import ICreateLocalizationDTO from '@modules/localizations/dtos/ICreateLocalizationDTO';

import Localization from '@modules/localizations/infra/typeorm/schemas/Localization';

class LocalizationsRepository implements ILocalizationsRepository {
  private ormRepository: MongoRepository<Localization>;

  constructor() {
    this.ormRepository = getMongoRepository(Localization, 'mongo');
  }

  public async findLocation(
    device_id: string
  ): Promise<Localization | undefined> {
    const localization = this.ormRepository.findOne({
      where: { device_id },
      order: { date: 'DESC' },
    });

    return localization;
  }

  public async create({
    date,
    device_id,
    direction,
    distancy,
    currentSpeed,
    fixedGPS,
    historicGPS,
    ignitionOn,
    latitude,
    longitude,
    reportingTime,
  }: ICreateLocalizationDTO): Promise<Localization> {
    const localization = this.ormRepository.create({
      date,
      device_id,
      direction,
      distancy,
      currentSpeed,
      fixedGPS,
      historicGPS,
      ignitionOn,
      latitude,
      longitude,
      reportingTime,
    });

    await this.ormRepository.save(localization);

    return localization;
  }
}

export default LocalizationsRepository;
