import { hexToDec } from 'hex2dec';

export default function parseReportingTImeAndConvert(data: string): number {
  const reportingTime = hexToDec(data.substring(32, 40));

  return Number(reportingTime);
}
