import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Model from '@modules/EquipmentModel/infra/typeorm/entities/EquipmentModel';

class Equipment implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const model = await connection
      .getRepository(Model)
      .createQueryBuilder('equipment_models')
      .where("name = 'SFT9001'")
      .getOne();

    const user = await connection
      .getRepository(User)
      .createQueryBuilder('users')
      .where("name = 'Rafael Sad'")
      .getOne();

    const model_id = model ? model.id : '11';
    const user_id = user ? user.id : '11';

    const values = {
      model_id,
      user_id,
      device_id: 671603,
      vehicle: 'New Fiesta',
      image: null,
      created_at: new Date(),
      updated_at: new Date(),
    };

    await connection
      .createQueryBuilder()
      .insert()
      .into('equipments')
      .values(values)
      .execute();
  }
}

export default Equipment;
