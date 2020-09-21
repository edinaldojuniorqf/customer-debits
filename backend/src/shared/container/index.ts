import { container } from 'tsyringe';

import ICustomerRepository from '@modules/customer/repositories/ICustomerRepository';
import CustomerRepository from '@modules/customer/infra/typeorm/repositories/CustomerRepository';
import IDebtRepository from '@modules/debt/repositories/IDebtRepository';
import DebtRepository from '@modules/debt/infra/typeorm/repositories/DebtRepository';

container.registerSingleton<ICustomerRepository>(
  'CustomerRepository',
  CustomerRepository,
);

container.registerSingleton<IDebtRepository>('DebtRepository', DebtRepository);
