import { Router } from 'express';
import customerRouter from '@modules/customer/infra/http/routes/customer.routes';
import debtRouter from '@modules/debt/infra/http/routes/debt.routes';

const routes = Router();

routes.use('/customer', customerRouter);
routes.use('/debt', debtRouter);

export default routes;
