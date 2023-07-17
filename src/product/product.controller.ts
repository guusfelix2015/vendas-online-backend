import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { UserType } from '../user/enum/user-type.enum';
import { Roles } from '../decorators/roles.decorator';
import { ReturnProductDto } from './dtos/return-products.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { DeleteResult } from 'typeorm';

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
}
