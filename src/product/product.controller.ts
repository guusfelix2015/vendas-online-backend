import { Controller, Get, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { UserType } from '../user/enum/user-type.enum';
import { Roles } from '../decorators/roles.decorator';
import { ReturnProductDto } from './dtos/return-products.dto';

@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAllProducts(): Promise<ReturnProductDto[]> {
    const products = await this.productService.findAllProducts();

    if (!products || products.length === 0) {
      throw new NotFoundException('Products not found');
    }

    return products.map((product) => new ReturnProductDto(product));
  }
}
