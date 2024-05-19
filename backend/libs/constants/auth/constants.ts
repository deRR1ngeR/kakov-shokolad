import { ConfigService } from '@nestjs/config';

const config = new ConfigService();

export const ROUND_OF_SALT = parseInt(config.get('ROUND_OF_SALT'));
