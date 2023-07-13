import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userEntityMock: UserEntity = {
  cpf: '10142039616',
  createdAt: new Date(),
  email: 'mock@gmail.com',
  id: 1,
  name: 'Mock',
  password: '123456',
  phone: '999999999',
  typeUser: UserType.User,
  updatedAt: new Date(),
};
