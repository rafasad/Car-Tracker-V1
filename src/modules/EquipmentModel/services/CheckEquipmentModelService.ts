import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEquipmentModelRepository from '../repositories/IEquipmentModelRepository';

interface IRequest {
  header: string;
}

export interface IResponse {
  allowed: boolean;
  model?: string;
}

@injectable()
class CheckEquipmentModelService {
  constructor(
    @inject('EquipmentModelRepository')
    private equipmentModelRepository: IEquipmentModelRepository
  ) {}

  public async execute({ header }: IRequest): Promise<IResponse> {
    const equipment = await this.equipmentModelRepository.findByHeader({
      header,
    });

    return {
      allowed: !!equipment,
      model: equipment?.name,
    };
  }
}

export default CheckEquipmentModelService;
