import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import EquipmentModel from '@modules/EquipmentModel/infra/typeorm/entities/EquipmentModel';

@Entity('equipments')
class Equipment {
  @PrimaryColumn('uuid')
  model_id: string;

  @ManyToOne(() => EquipmentModel)
  @JoinColumn({ name: 'model_id' })
  EquipmentModel: EquipmentModel;

  @PrimaryColumn('uuid')
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('int')
  device_id: number;

  @Column('varchar')
  vehicle: string;

  @Column('varchar')
  image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Equipment;
