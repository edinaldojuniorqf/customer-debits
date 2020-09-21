import {
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';
import Debt from './Debt';

@Entity('debts_items')
class DebtItem {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  value: number;

  @Column(() => Debt)
  debt: Debt;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default DebtItem;
