import { injectable, inject } from 'tsyringe';
import { hexToDec } from 'hex2dec';

import IEquipmentRepository from '@modules/Equipment/repositories/IEquipmentRepository';

import parseDeviceId from '@shared/util/parseDeviceId';
import parseType from '@shared/util/parseType';

import parseDateAndConvert from '@shared/util/parseDateAndConvert';
import parseDirectionAndConvert from '@shared/util/parseDirectionAndConvert';
import parseDistancyAndConvert from '@shared/util/parseDistancyAndConvert';
import parseReportingTImeAndConvert from '@shared/util/parseReportingTImeAndConvert';
import parseBinaryInfoAndConvert from '@shared/util/parseBinaryInfoAndConvert';
import parseCurrentSpeedAndConvert from '@shared/util/parseCurrentSpeedAndConvert';
import parseLatitudeLongitudeAndConvert from '@shared/util/parseLatitudeLongitudeAndConvert';

import ILocalizationsRepository from '@modules/localizations/repositories/ILocalizationsRepository';
import AppError from '@shared/error/AppError';

interface IRequest {
  packageData: string;
}
export interface IResponse {
  heartbeat: boolean;
  response: string | undefined;
}

@injectable()
class SFT9001Service {
  constructor(
    @inject('EquipmentRepository')
    private equipmentRepository: IEquipmentRepository,

    @inject('LocalizationsRepository')
    private localizationsRepository: ILocalizationsRepository
  ) {}

  public async execute({ packageData }: IRequest): Promise<IResponse> {
    const device_id = parseDeviceId(packageData);
    const typeMessage = parseType(packageData);

    const deviceIdDecimal = hexToDec(device_id);

    const equipment = await this.equipmentRepository.findByDeviceId(
      Number(deviceIdDecimal)
    );

    if (!equipment) {
      throw new AppError('Equipment not found', 401);
    }

    if (typeMessage === '01') {
      return {
        heartbeat: true,
        response: `50F70150494E4773C4`,
      };
    }

    if (typeMessage === '02') {
      const date = parseDateAndConvert(packageData);
      const direction = parseDirectionAndConvert(packageData);
      const distancyInMeters = parseDistancyAndConvert(packageData);
      const reportingTime = parseReportingTImeAndConvert(packageData);
      const {
        fixedGPS,
        historicGPS,
        ignitionOn,
        negativeLatitude,
        negativeLongitude,
      } = parseBinaryInfoAndConvert(packageData);

      const currentSpeed = parseCurrentSpeedAndConvert(packageData);
      const { latitude, longitude } = parseLatitudeLongitudeAndConvert(
        packageData
      );

      const latitudeFinal = negativeLatitude ? `-${latitude}` : latitude;
      const longitudeFinal = negativeLongitude ? `-${longitude}` : longitude;

      await this.localizationsRepository.create({
        device_id: deviceIdDecimal,
        date,
        direction,
        distancy: distancyInMeters,
        reportingTime,
        fixedGPS,
        historicGPS,
        ignitionOn,
        currentSpeed: Number(currentSpeed),
        latitude: Number(latitudeFinal),
        longitude: Number(longitudeFinal),
      });
    }

    return {
      heartbeat: false,
      response: undefined,
    };
  }
}

export default SFT9001Service;
