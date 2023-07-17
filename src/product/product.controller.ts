import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { UserType } from '../user/enum/user-type.enum';
import { Roles } from '../decorators/roles.decorator';
import { ReturnProductDto } from './dtos/return-products.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { DeleteResult } from 'typeorm';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createProduct(
    @Body() createProduct: CreateProductDto,
  ): Promise<ReturnProductDto> {
    const product = await this.productService.createProduct(createProduct);

    return product;
  }

  @Roles(UserType.Admin)
  @Delete('/:productId')
  async deleteProduct(
    @Param('productId') productId: number,
  ): Promise<DeleteResult> {
    const product = await this.productService.deleteProduct(productId);

    return product;
  }

  @Roles(UserType.Admin)
  @Get()
  async findAllProducts(): Promise<ReturnProductDto[]> {
    const products = await this.productService.findAllProducts();

    if (!products || products.length === 0) {
      throw new NotFoundException('Products not found');
    }

    return products.map((product) => new ReturnProductDto(product));
  }

  @Roles(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Put('/:productId')
  async updateProduct(
    @Body() updateProduct: UpdateProductDto,
    @Param('productId') productId: number,
  ): Promise<ProductEntity> {
    const product = await this.productService.updateProduct(
      updateProduct,
      productId,
    );

    return product;
  }
}
