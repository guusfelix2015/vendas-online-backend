import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryService } from '../category.service';
import { CategoryEntity } from '../entities/category.entity';
import { categoryMock } from '../__mocks__/category.mock';
import { createCategoryMock } from '../__mocks__/create-category.mock';
import { BadRequestException } from '@nestjs/common';

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: Repository<CategoryEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(categoryMock),
            find: jest.fn().mockResolvedValue([categoryMock]),
            save: jest.fn().mockResolvedValue(categoryMock),
          },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<Repository<CategoryEntity>>(
      getRepositoryToken(CategoryEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoryRepository).toBeDefined();
  });

  it('should return list category', async () => {
    const categories = await service.findAllCategories();

    expect(categories).toEqual([categoryMock]);
  });

  it('should return error in list category empty', async () => {
    jest.spyOn(categoryRepository, 'find').mockResolvedValue([]);

    expect(service.findAllCategories()).rejects.toThrowError();
  });

  it('should return error in list category exception', async () => {
    jest.spyOn(categoryRepository, 'find').mockRejectedValue(new Error());

    expect(service.findAllCategories()).rejects.toThrowError();
  });

  it('should return error if category name already exists', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(categoryMock);
    await expect(
      service.createCategory(createCategoryMock),
    ).rejects.toThrowError(BadRequestException);
  });

  it('should return category created', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined);
    const category = await service.createCategory(createCategoryMock);
    expect(category).toEqual(categoryMock);
  });

  it('should return error in category created', async () => {
    jest.spyOn(categoryRepository, 'save').mockRejectedValue(new Error());
    expect(service.createCategory(createCategoryMock)).rejects.toThrowError();
  });

  it('should return category by id', async () => {
    const category = await service.findCategoryById(categoryMock.id);
    expect(category).toEqual(categoryMock);
  });

  it("should return error if category id doesn't exists", async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined);
    expect(service.findCategoryById(categoryMock.id)).rejects.toThrowError();
  });
});
