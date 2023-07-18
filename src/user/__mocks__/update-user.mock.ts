import { UpdatePasswordDto } from '../dtos/update-password.dto';

export const updatePasswordMock: UpdatePasswordDto = {
  lastPassword: 'abc',
  newPassword: 'aushduashdhas',
};

export const updatePasswordInvalidMock: UpdatePasswordDto = {
  lastPassword: 'ashduhasdu',
  newPassword: 'dasasdasd',
};
