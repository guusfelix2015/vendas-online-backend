import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productMock } from '../__mocks__/product.mock';
import { createProductMock } from '../__mocks__/create-product.mock';
import { CategoryService } from '../../category/category.service';
import { categoryMock } from '../../category/__mocks__/category.mock';
import { deleteResultMock } from '../../__mocks__/return-delete.mock';

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: Repository<ProductEntity>;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: CategoryService,
          useValue: {
            findCategoryById: jest.fn().mockResolvedValue(categoryMock),
          },
        },
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([productMock]),
            findOne: jest.fn().mockResolvedValue(productMock),
            save: jest.fn().mockResolvedValue(productMock),
            delete: jest.fn().mockResolvedValue(deleteResultMock),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    categoryService = module.get<CategoryService>(CategoryService);
    productRepository = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(productRepository).toBeDefined();
  });

  it('should return all products', async () => {
    const products = await service.findAllProducts();

    expect(products).toEqual([productMock]);
  });

  it('should return error if products empty', async () => {
    jest.spyOn(productRepository, 'find').mockResolvedValueOnce([]);

    expect(service.findAllProducts()).rejects.toThrowError();
  });

  it('should return error in products exception', async () => {
    jest.spyOn(productRepository, 'find').mockRejectedValueOnce(new Error());

    expect(service.findAllProducts()).rejects.toThrowError();
  });

  it('should return product after inset in DB', async () => {
    const product = await service.createProduct(createProductMock);

    expect(product).toEqual(productMock);
  });

  it('should return product after insert in DB', async () => {
    jest
      .spyOn(categoryService, 'findCategoryById')
      .mockRejectedValue(new Error());

    expect(service.createProduct(createProductMock)).rejects.toThrowError();
  });

  it('should return product by product id', async () => {
    const product = await service.findProductById(productMock.id);

    expect(product).toEqual(productMock);
  });

  it('should return error if product not found', async () => {
    jest.spyOn(productRepository, 'findOne').mockResolvedValueOnce(undefined);

    expect(service.findProductById(productMock.id)).rejects.toThrowError();
  });

  it('should delete product by id', async () => {
    const product = await service.deleteProduct(productMock.id);

    expect(product).toEqual(deleteResultMock);
  });

  it('should return product after update', async () => {
    const product = await service.updateProduct(
      createProductMock,
      productMock.id,
    );

    expect(product).toEqual(productMock);
  });

  it('should return error if product not found in update', async () => {
    jest.spyOn(productRepository, 'findOne').mockRejectedValue(new Error());

    expect(
      service.updateProduct(createProductMock, productMock.id),
    ).rejects.toThrowError();
  });
});
