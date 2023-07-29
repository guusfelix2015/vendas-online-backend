import { ReturnCartDto } from '../../cart/dtos/return-cart.dto';
import { ReturnProductDto } from '../../product/dtos/return-products.dto';

export class ReturnCartProductDto {
  id: number;
  product?: ReturnProductDto;
  cart?: ReturnCartDto;
  productId: number;
  amount: number;
  cartId: number;
  constructor(cartProduct: ReturnCartProductDto) {
    this.id = cartProduct.id;
    this.amount = cartProduct.amount;
    this.productId = cartProduct.productId;
    this.cartId = cartProduct.cartId;
    this.product = cartProduct.product;
    this.cart = cartProduct.cart;
  }
}
