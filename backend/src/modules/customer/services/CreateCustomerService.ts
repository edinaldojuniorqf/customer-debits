import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICustomerRepository from '../repositories/ICustomerRepository';
import Customer from '../infra/typeorm/schemas/Customer';

interface IRequest {
  name: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<Customer> {
    let customer: Customer | undefined;

    customer = await this.customerRepository.findByName(name);

    if (customer) {
      throw new AppError(`User with name ${name} already registred`);
    }

    customer = await this.customerRepository.save({ name });

    return customer;
  }
}

export default CreateCustomerService;
