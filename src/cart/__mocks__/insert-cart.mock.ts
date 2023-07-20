import { productMock } from '../../product/__mocks__/product.mock';
import { InsertCartDto } from '../dtos/insert-cart.dto';

export const inserCartoMock: InsertCartDto = {
  amount: 300,
  productId: productMock.id,
};
