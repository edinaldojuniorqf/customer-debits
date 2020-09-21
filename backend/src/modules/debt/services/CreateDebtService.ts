import ICustomerRepository from '@modules/customer/repositories/ICustomerRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Debt from '../infra/typeorm/schemas/Debt';
import DebtItem from '../infra/typeorm/schemas/DebtItem';
import IDebtRepository from '../repositories/IDebtRepository';

interface IItems {
  value: number;
}

interface IRequest {
  date: Date;
  customerId: string;
  items: IItems[];
}

@injectable()
class CreateDebtService {
  constructor(
    @inject('DebtRepository')
    private debtRepository: IDebtRepository,

    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({ date, customerId, items }: IRequest): Promise<Debt> {
    const customer = await this.customerRepository.findOne(customerId);

    if (!customer) {
      throw new AppError(`Customer with id ${customerId} not found.`);
    }

    const debtItems = items.map(item => {
      const debtItem = new DebtItem();
      debtItem.value = item.value;
      return debtItem;
    });

    const debt = await this.debtRepository.save({
      date,
      customer,
      items: debtItems,
    });

    return debt;
  }
}

export default CreateDebtService;
