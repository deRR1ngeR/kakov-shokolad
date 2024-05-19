import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from '@app/db';
import {
  GoogleDriveConfig,
  GoogleDriveModule,
} from 'nestjs-googledrive-upload';
import * as config from './google.key.json';
import { UploadService } from './upload/upload.service';
import { UploadController } from './upload/upload.controller';
import { OrderModule } from '../Order/order.module';
@Module({
  imports: [
    PrismaModule,
    OrderModule,
    GoogleDriveModule.register(
      config as GoogleDriveConfig,
      '1uez7OXhsm9ELFDXOcUS8P677Jw-ebJYP',
    ),
  ],
  providers: [ProductService, UploadService],
  controllers: [ProductController, UploadController],
})
export class ProductModule {}
