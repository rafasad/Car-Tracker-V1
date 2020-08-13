/* eslint-disable no-case-declarations */

import { container } from 'tsyringe';

import CheckEquipmentModelService from '@modules/EquipmentModel/services/CheckEquipmentModelService';
import SFT9001Service, {
  IResponse,
} from '@modules/Equipment/services/SFT9001Service';
import parseHeader from '@shared/util/parseHeader';

export default async function HandShakeController(
  packageData: string
): Promise<IResponse | undefined> {
  const header = parseHeader(packageData);

  const CheckEquipmentModelExists = container.resolve(
    CheckEquipmentModelService
  );

  const equipmentModel = await CheckEquipmentModelExists.execute({
    header,
  });

  const { model } = equipmentModel;

  switch (model) {
    case 'SFT9001':
      const sft9001Service = container.resolve(SFT9001Service);

      const result = await sft9001Service.execute({ packageData });

      return result;
    default:
      console.log(`Model don't exist - End connection`);
      return undefined;
  }
}
