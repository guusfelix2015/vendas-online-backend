import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ReturnCategoryDto } from './dtos/return-category.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Roles(UserType.Admin, UserType.User)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  async createCategory(
    @Body() createCategory: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    const category = await this.categoryService.createCategory(createCategory);

    return category;
  }

  @Get()
  async findAllCategories(): Promise<ReturnCategoryDto[]> {
    const categories = await this.categoryService.findAllCategories();

    return categories.map((category) => new ReturnCategoryDto(category));
  }
}
