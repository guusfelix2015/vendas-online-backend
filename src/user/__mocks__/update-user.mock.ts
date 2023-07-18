import { UpdatePasswordDto } from '../dtos/update-password.dto';

export const updatePasswordMock: UpdatePasswordDto = {
  lastPassword: '1234567',
  newPassword: 'aushduashdhas',
};

export const updatePasswordInvalidMock: UpdatePasswordDto = {
  lastPassword: 'ashduhasdu',
  newPassword: 'dasasdasd',
};
