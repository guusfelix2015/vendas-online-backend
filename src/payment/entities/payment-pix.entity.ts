import { ChildEntity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentEntity } from './payment.entity';

@ChildEntity()
export class PaymentPixEntity extends PaymentEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'code', nullable: false })
  code: number;

  @Column({ name: 'date_payment', nullable: false })
  datePayment: Date;
}
