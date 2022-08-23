import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { IAuthUserDTO } from '../dtos/auth-user.dto';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): IAuthUserDTO => {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    // console.log(req.user);

    return req.user;
  }
);
