import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IEquipmentModelRepository from '@modules/EquipmentModel/repositories/IEquipmentModelRepository';
import EquipmentModelRepository from '@modules/EquipmentModel/infra/typeorm/repositories/EquipmentModelRepository';

import IEquipmentRepository from '@modules/Equipment/repositories/IEquipmentRepository';
import EquipmentRepository from '@modules/Equipment/infra/typeorm/repositories/EquipmentRepository';

import ILocalizationsRepository from '@modules/localizations/repositories/ILocalizationsRepository';
import LocalizationsRepository from '@modules/localizations/infra/typeorm/repositories/LocalizationsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IEquipmentModelRepository>(
  'EquipmentModelRepository',
  EquipmentModelRepository
);

container.registerSingleton<IEquipmentRepository>(
  'EquipmentRepository',
  EquipmentRepository
);

container.registerSingleton<ILocalizationsRepository>(
  'LocalizationsRepository',
  LocalizationsRepository
);
