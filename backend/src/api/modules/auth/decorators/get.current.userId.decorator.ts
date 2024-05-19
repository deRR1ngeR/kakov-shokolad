import { ExecutionContext, createParamDecorator } from '@nestjs/common';

/**
 * Позволяет извлечь id пользователя с помощью
 * GetCurrentUserId()
 */
export const GetCurrentUserId = createParamDecorator(
  (data: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    return request.user['sub'];
  },
);
