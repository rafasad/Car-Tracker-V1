import { hexToDec } from 'hex2dec';

export default function parseCurrentSpeedAndConvert(data: string): string {
  const currentSpeed = hexToDec(data.substring(48, 50));

  return currentSpeed;
}
