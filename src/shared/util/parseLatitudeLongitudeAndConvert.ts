import { hexToDec } from 'hex2dec';

interface IResponse {
  latitude: string;
  longitude: string;
}

export default function parseLatitudeLongitudeAndConvert(
  data: string
): IResponse {
  const latitude = hexToDec(data.substring(50, 58));
  const longitude = hexToDec(data.substring(58, 66));

  return { latitude, longitude };
}
