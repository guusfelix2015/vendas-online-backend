import { ChildEntity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentEntity } from './payment.entity';

@ChildEntity()
export class PaymentCreditCardEntity extends PaymentEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'amout_payment', nullable: false })
  amoutPayment: number;
}
