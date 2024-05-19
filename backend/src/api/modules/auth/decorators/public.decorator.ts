import { SetMetadata } from '@nestjs/common';

/**
 * Позволяет делать роуты публичными, игнорируя проверку токенов
 */
export const Public = () => SetMetadata('isPublic', true);
