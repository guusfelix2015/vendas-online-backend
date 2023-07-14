import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { authorizantionToLoginPayload } from 'src/utils/base-64-converter';

export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
  const { authorization } = ctx.switchToHttp().getRequest().headers;

  const token = authorization?.split(' ')[1];

  const loginPayload = authorizantionToLoginPayload(token);

  return loginPayload?.id;
});
