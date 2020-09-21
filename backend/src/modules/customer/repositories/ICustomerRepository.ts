import Customer from '../infra/typeorm/schemas/Customer';

export interface ISaveDTO {
  name: string;
}

export default interface ICustomerRepository {
  save(data: ISaveDTO): Promise<Customer>;
  findOne(id: string): Promise<Customer | undefined>;
  findByName(name: string): Promise<Customer | undefined>;
}
