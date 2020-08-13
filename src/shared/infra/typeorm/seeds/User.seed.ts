import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import bcryptjs from 'bcryptjs';

export default class User implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const password = await bcryptjs.hash('123456', 8);

    const values = {
      name: 'Rafael Sad',
      email: 'rafael@teste.com',
      password,
      created_at: new Date(),
      updated_at: new Date(),
    };

    await connection
      .createQueryBuilder()
      .insert()
      .into('users')
      .values(values)
      .execute();
  }
}
