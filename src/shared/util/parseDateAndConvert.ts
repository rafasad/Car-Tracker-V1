import { hexToDec } from 'hex2dec';

export default function parseDateAndConvert(data: string): Date {
  const dateTime = hexToDec(data.substring(12, 20));
  const date = new Date(0);
  date.setUTCSeconds(Number(dateTime));

  return date;
}
