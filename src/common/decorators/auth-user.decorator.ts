import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from './../../user/entities/user.entity';

const AuthUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user as UserEntity;
  return user;
});
export default AuthUser;
