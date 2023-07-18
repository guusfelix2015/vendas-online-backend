import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userEntityMock: UserEntity = {
  cpf: '12312312300',
  createdAt: new Date(),
  email: 'gusfelix2016@gmail.com',
  id: 7,
  name: '12131231',
  password: '$2b$10$SNEeZdsba6lQ3RtTgMn3aeJz7KNPSkCHLbGUpPxQiHCYUdDPbW4.m',
  phone: '34992910363',
  typeUser: UserType.Admin,
  updatedAt: new Date(),
};
