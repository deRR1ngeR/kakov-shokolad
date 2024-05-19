import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../../libs/db/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '@prisma/client';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  PaginateFunction,
  PaginatedResult,
  paginator,
} from '../pagination/interface/paginator.interface';
import { QueryProductDto } from './dto/query-product.dto';
import { OrderProductService } from '../Order/orderProduct.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly db: PrismaService,
    private readonly orderProductService: OrderProductService,
  ) {}

  async create(
    data: CreateProductDto,
  ): Promise<Product & { productImages: string[] }> {
    const product = await this.db.product.create({
      data: {
        main_image: data.ProductImages[0],
        name: data.name,
        description: data.description,
        price: +data.price,
        isActivated: true,
      },
    });

    data.ProductImages.map(async (image) => {
      await this.db.productImage.create({
        data: {
          productImage: image,
          product_id: product.id,
        },
      });
    });
    return { ...product, productImages: data.ProductImages };
  }

  async findProductById(id: number): Promise<Product> {
    try {
      return await this.db.product.findUnique({
        where: {
          id: id,
        },
        include: {
          ProductImages: true,
        },
      });
    } catch (err) {
      return;
    }
  }

  async findAllProducts(
    query: QueryProductDto,
  ): Promise<PaginatedResult<Product>> {
    const where = {
      isActivated: true,
      name: {
        contains: query?.name,
        mode: 'insensitive',
      },
    };
    const orderBy = {
      price: query?.sortByPrice,
    };
    const paginate: PaginateFunction = paginator({ perPage: query.size });
    return await paginate(
      this.db.product,
      {
        where,
        orderBy,
      },
      {
        page: query.page,
      },
    );
  }

  async findAll(): Promise<Product[]> {
    return await this.db.product.findMany();
  }

  async update(id: number, data: UpdateProductDto): Promise<Product> {
    if (data.ProductImages.length) {
      console.log(data.ProductImages);
      await this.db.productImage.deleteMany({
        where: {
          product_id: id,
        },
      });
      data.ProductImages.map(async (image) => {
        await this.db.productImage.create({
          data: {
            productImage: image,
            product_id: id,
          },
        });
      });
    }
    const updatedData = {
      main_image: data.ProductImages[0],
      name: data.name,
      description: data.description,
      price: +data.price,
    };
    return await this.db.product.update({
      where: {
        id,
      },
      data: {
        ...updatedData,
      },
    });
  }

  async delete(id: number): Promise<Product> {
    const product = await this.findProductById(id);
    const isAlreadyInOrder =
      await this.orderProductService.isProductAlreadyInOrder(product.id);

    if (isAlreadyInOrder)
      throw new HttpException(
        'Product already in order',
        HttpStatus.BAD_REQUEST,
      );

    if (product) {
      return await this.db.product.delete({
        where: {
          id: id,
        },
      });
    } else {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
  }

  async findAllActivated(): Promise<Product[]> {
    return await this.db.product.findMany({
      where: {
        isActivated: true,
      },
    });
  }

  async changeProductStatus(id: number) {
    try {
      const product = await this.findProductById(id);
      if (product) {
        await this.db.product.update({
          where: {
            id,
          },
          data: {
            isActivated: !product.isActivated,
          },
        });
        return await this.findAll();
      } else throw new NotFoundException('Product not found');
    } catch (err) {
      throw new BadRequestException('Request failed');
    }
  }
}
