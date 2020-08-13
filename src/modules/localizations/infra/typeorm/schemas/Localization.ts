import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('localizations')
class Localization {
  @ObjectIdColumn()
  id: ObjectID;

  @Column('uuid')
  device_id: string;

  @Column()
  date: Date;

  @Column()
  direction: number;

  @Column()
  distancy: number;

  @Column()
  reportingTime: number;

  @Column()
  currentSpeed: number;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column({ default: false })
  ignitionOn: boolean;

  @Column({ default: false })
  fixedGPS: boolean;

  @Column({ default: false })
  historicGPS: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Localization;
