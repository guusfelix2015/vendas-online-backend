import { CartProdutEntity } from '../../cart-product/entity/cart-product-entity';
import {
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class CartEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'user_id', nullable: false })
  userId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => CartEntity, (cartEntity) => cartEntity.cartProduct)
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cartProduct?: CartProdutEntity[];
}
