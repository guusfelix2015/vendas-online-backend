import { categoryMock } from '../../category/__mocks__/category.mock';
import { ProductEntity } from '../entities/product.entity';

export const productMock: ProductEntity = {
  id: 1,
  categoryId: categoryMock.id,
  name: 'Product 1',
  price: 100,
  image: 'image',
  createdAt: new Date(),
  updatedAt: new Date(),
};
