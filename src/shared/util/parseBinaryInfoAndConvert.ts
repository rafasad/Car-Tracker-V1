import hexaDecimalToBinary from '@shared/util/hexaDecimalToBinary';

interface IResponse {
  fixedGPS: boolean;
  historicGPS: boolean;
  ignitionOn: boolean;
  negativeLatitude: boolean;
  negativeLongitude: boolean;
}

export default function parseBinaryInfoAndConvert(data: string): IResponse {
  const binaryData = hexaDecimalToBinary(data.substring(40, 44));

  const fixedGPS = binaryData.substring(0, 1) === '1';
  const historicGPS = binaryData.substring(1, 2) === '1';
  const ignitionOn = binaryData.substring(2, 3) === '1';
  const negativeLatitude = binaryData.substring(3, 4) === '1';
  const negativeLongitude = binaryData.substring(4, 5) === '1';

  return {
    fixedGPS,
    historicGPS,
    ignitionOn,
    negativeLatitude,
    negativeLongitude,
  };
}
