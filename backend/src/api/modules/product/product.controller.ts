import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Query,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '@prisma/client';
import { ProductService } from './product.service';
import { PaginatedResult } from '../pagination/interface/paginator.interface';
import { QueryProductDto } from './dto/query-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() data: CreateProductDto): Promise<Product> {
    return await this.productService.create(data);
  }

  @Public()
  @Get()
  async findAllProductsWithPagination(
    @Query() query: QueryProductDto,
  ): Promise<PaginatedResult<Product>> {
    return await this.productService.findAllProducts(query);
  }

  @Public()
  @Get('/all')
  async findAllProducts(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Public()
  @Get('/allActivated')
  async findAllActivatedProducts(): Promise<Product[]> {
    return await this.productService.findAllActivated();
  }

  @Patch('status/:id')
  @HttpCode(200)
  async changeProductStatus(@Param('id') id: string): Promise<Product[]> {
    return await this.productService.changeProductStatus(+id);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() data: UpdateProductDto,
  ): Promise<Product> {
    return await this.productService.update(+id, data);
  }

  @Delete(':id')
  @HttpCode(201)
  async deleteProduct(@Param('id') id: string): Promise<Product> {
    return await this.productService.delete(+id);
  }

  @Public()
  @Get(':id')
  @HttpCode(201)
  async findProductById(@Param('id') id: string): Promise<Product> {
    return await this.productService.findProductById(+id);
  }
}
