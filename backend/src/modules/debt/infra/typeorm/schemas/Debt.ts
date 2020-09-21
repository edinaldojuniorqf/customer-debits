import {
  Entity,
  Column,
  ObjectIdColumn,
  ObjectID,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Customer from '@modules/customer/infra/typeorm/schemas/Customer';
import DebtItem from './DebtItem';

@Entity('debts')
class Debt {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  date: Date;

  @Column(() => Customer)
  customer: Customer;

  @Column()
  items: DebtItem[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Debt;
