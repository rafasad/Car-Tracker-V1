export default interface ICreateLocalizationDTO {
  device_id: string;
  date: Date;
  direction: number;
  distancy: number;
  reportingTime: number;
  currentSpeed: number;
  latitude: number;
  longitude: number;
  ignitionOn: boolean;
  fixedGPS: boolean;
  historicGPS: boolean;
}
