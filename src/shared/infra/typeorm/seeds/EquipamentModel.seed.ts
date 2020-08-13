import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';

const values = {
  name: 'SFT9001',
  header: '50F7',
  created_at: new Date(),
  updated_at: new Date(),
};

export default class EquipamentModel implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('equipment_models')
      .values(values)
      .execute();
  }
}
