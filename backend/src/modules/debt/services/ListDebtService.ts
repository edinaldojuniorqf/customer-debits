import { inject, injectable } from 'tsyringe';
import IDebtRepository from '../repositories/IDebtRepository';

interface IRequest {
  q?: string | undefined;
  sort?: string | undefined;
  order?: 'ASC' | 'DESC' | string | undefined;
  limit?: number | undefined;
  offset?: number | undefined;
}

interface IData {
  customerName: string;
  date: Date;
  value: number;
}

interface IResponse {
  data: IData[];
  total: number;
}

@injectable()
class ListDebtService {
  constructor(
    @inject('DebtRepository')
    private debtRepository: IDebtRepository,
  ) {}

  public async execute({
    q = '',
    sort = 'id',
    order = 'ASC',
    limit = 10,
    offset = 0,
  }: IRequest): Promise<IResponse> {
    const reSearch = new RegExp(q, 'i');

    const debts = await this.debtRepository.find({
      where: {
        $or: [
          q
            ? {
                'customer.name': reSearch,
              }
            : {},
        ],
      },
      order: {
        [sort]: order,
      },
      skip: offset,
      take: limit,
    });

    const data: IData[] = debts.map(debt => {
      const value = debt.items.reduce((acc, item) => {
        return acc + item.value;
      }, 0);

      return {
        customerName: debt.customer.name,
        date: debt.date,
        value,
      };
    });

    const total = await this.debtRepository.count();

    return {
      data,
      total,
    };
  }
}

export default ListDebtService;
