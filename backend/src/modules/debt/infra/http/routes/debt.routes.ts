import { Router } from 'express';

import DebtController from '../controllers/DebtController';

const debtRouter = Router();
const debtController = new DebtController();

debtRouter.post('/', debtController.create);
debtRouter.get('/', debtController.list);

export default debtRouter;
