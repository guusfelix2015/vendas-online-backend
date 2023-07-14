import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userEntityMock: UserEntity = {
  cpf: '10142039616',
  createdAt: new Date(),
  email: 'gusfelix2016@gmail.com',
  id: 1,
  name: 'Mock',
  password: '$2b$10$14hPfvrPjbbXcaULGGNFNua28j2F9hYMqGo.3IP8TNP2.PrdrnF5q',
  phone: '999999999',
  typeUser: UserType.User,
  updatedAt: new Date(),
};
