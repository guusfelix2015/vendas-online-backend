import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userEntityMock: UserEntity = {
  cpf: '12312312300',
  createdAt: new Date(),
  email: 'gusfelix2016@gmail.com',
  id: 7,
  name: '12131231',
  password: '$2b$10$FTlc.VlRa/wmnQ5gjcDrMuw05eTuxLfEfJLR3X37mxvNQdIq/qWD2',
  phone: '34992910363',
  typeUser: UserType.Admin,
  updatedAt: new Date(),
};
