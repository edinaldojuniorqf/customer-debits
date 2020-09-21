import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateDebtService from '@modules/debt/services/CreateDebtService';
import ListDebtService from '@modules/debt/services/ListDebtService';

export default class DebtController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { date, customerId, items } = request.body;

    const createDebt = container.resolve(CreateDebtService);

    const debt = await createDebt.execute({
      date,
      customerId,
      items,
    });

    return response.json(debt);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const { q, sort, order, limit, offset } = request.query;
    const listDebt = container.resolve(ListDebtService);

    const debt = await listDebt.execute({
      q: q ? String(q) : undefined,
      sort: sort ? String(sort) : undefined,
      order: order ? String(order) : undefined,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
    });

    return response.json(debt);
  }
}
