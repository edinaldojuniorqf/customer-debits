import { getMongoRepository, MongoRepository } from 'typeorm';

import ICustomerRepository, {
  ISaveDTO,
} from '@modules/customer/repositories/ICustomerRepository';
import Customer from '../schemas/Customer';

class CustomerRepository implements ICustomerRepository {
  private repository: MongoRepository<Customer>;

  constructor() {
    this.repository = getMongoRepository(Customer);
  }

  public async save({ name }: ISaveDTO): Promise<Customer> {
    return this.repository.save({
      name,
    });
  }

  public async findOne(id: string): Promise<Customer | undefined> {
    return this.repository.findOne(id);
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    return this.repository.findOne({
      where: {
        name,
      },
    });
  }
}

export default CustomerRepository;
