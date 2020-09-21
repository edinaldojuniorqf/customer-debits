import { Request, Response } from 'express';

import CreateCustomerService from '@modules/customer/services/CreateCustomerService';

import { container } from 'tsyringe';

export default class CustomerController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCustomer = container.resolve(CreateCustomerService);

    const customer = await createCustomer.execute({ name });

    return response.json(customer);
  }
}
