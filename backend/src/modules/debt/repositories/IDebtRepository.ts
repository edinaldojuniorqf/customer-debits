import Customer from '@modules/customer/infra/typeorm/schemas/Customer';
import Debt from '@modules/debt/infra/typeorm/schemas/Debt';
import DebtItem from '../infra/typeorm/schemas/DebtItem';

export interface ISaveDTO {
  date: Date;
  customer: Customer;
  items: DebtItem[];
}

export default interface IDebtRepository {
  save(data: ISaveDTO): Promise<Debt>;
  find(options: object): Promise<Debt[]>;
  count(): Promise<number>;
}
