export default function parseDeviceId(data: string): string {
  const deviceId = data.substring(4, 10);

  return deviceId;
}
