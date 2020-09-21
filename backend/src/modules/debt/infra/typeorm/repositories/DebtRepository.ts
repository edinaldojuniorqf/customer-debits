import { getMongoRepository, MongoRepository } from 'typeorm';

import IDebtRepository, {
  ISaveDTO,
} from '@modules/debt/repositories/IDebtRepository';
import Debt from '../schemas/Debt';

class DebtRepository implements IDebtRepository {
  private repository: MongoRepository<Debt>;

  constructor() {
    this.repository = getMongoRepository(Debt);
  }

  public async save({ date, customer, items }: ISaveDTO): Promise<Debt> {
    return this.repository.save({
      date,
      customer,
      items,
    });
  }

  public async find(options = {}): Promise<Debt[]> {
    return this.repository.find(options);
  }

  public async count(): Promise<number> {
    return this.repository.count();
  }
}

export default DebtRepository;
