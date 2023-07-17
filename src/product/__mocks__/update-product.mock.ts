import { categoryMock } from '../../category/__mocks__/category.mock';
import { UpdateProductDto } from '../dtos/update-product.dto';

export const updateProductMock: UpdateProductDto = {
  categoryId: categoryMock.id,
  image: 'imag111e',
  name: 'Product 1111',
  price: 200,
};
