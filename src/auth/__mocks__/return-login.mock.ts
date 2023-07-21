import { jwtMock } from '../../auth/__mocks__/jwt.mock';
import { ReturnLoginDto } from '../../auth/dtos/returnLogin.dto';
import { userEntityMock } from '../../user/__mocks__/user.mock';

export const retunrLoginMock: ReturnLoginDto = {
  accessToken: jwtMock,
  user: userEntityMock,
};
