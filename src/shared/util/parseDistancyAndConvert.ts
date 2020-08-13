import { hexToDec } from 'hex2dec';

export default function parseDistancyAndConvert(data: string): number {
  const distancy = hexToDec(data.substring(24, 32));

  return Number(distancy);
}
