import { hexToDec } from 'hex2dec';

export default function parseDirectionAndConvert(data: string): number {
  const direction = hexToDec(data.substring(20, 24));

  return Number(direction);
}
