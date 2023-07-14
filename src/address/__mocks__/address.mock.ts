import { cityMock } from '../../city/__mocks__/city.mock';
import { AddressEntity } from '../entities/address.entity';
import { userEntityMock } from '../../user/__mocks__/user.mock';

export const addressMock: AddressEntity = {
  id: 1,
  cep: '00000000',
  cityId: cityMock.id,
  complement: 'Complement',
  createdAt: new Date(),
  numberAddress: 123,
  updatedAt: new Date(),
  userId: userEntityMock.id,
};
