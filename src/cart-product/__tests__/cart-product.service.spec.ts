import { Test, TestingModule } from '@nestjs/testing';
import { CartProductService } from '../cart-product.service';
import { Not, Repository } from 'typeorm';
import { CartProductEntity } from '../entities/cart-product.entity';
import { ProductService } from '../../product/product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productMock } from '../../product/__mocks__/product.mock';
import { deleteResultMock } from '../../__mocks__/return-delete.mock';
import { cartMock } from '../../cart/__mocks__/cart.mock';
import { inserCartoMock } from '../../cart/__mocks__/insert-cart.mock';
import { CartProductMock } from '../__mocks__/cart-product.mock';
import { NotFoundException } from '@nestjs/common';

describe('CartProductService', () => {
  let service: CartProductService;
  let productService: ProductService;
  let cartProductRepository: Repository<CartProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProductService,
          useValue: {
            findProductById: jest.fn().mockResolvedValue(productMock),
          },
        },
        {
          provide: getRepositoryToken(CartProductEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(CartProductMock),
            save: jest.fn().mockResolvedValue(CartProductMock),
            delete: jest.fn().mockResolvedValue(deleteResultMock),
          },
        },
        CartProductService,
      ],
    }).compile();

    service = module.get<CartProductService>(CartProductService);
    productService = module.get<ProductService>(ProductService);
    cartProductRepository = module.get<Repository<CartProductEntity>>(
      getRepositoryToken(CartProductEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(productService).toBeDefined();
    expect(cartProductRepository).toBeDefined();
  });

  it('should return delete result after delete product', async () => {
    const deleteResult = await service.deleteProductCart(
      productMock.id,
      cartMock.id,
    );

    expect(deleteResult).toEqual(deleteResultMock);
  });

  it('should return error in exception delete', async () => {
    jest.spyOn(cartProductRepository, 'delete').mockRejectedValue(new Error());

    expect(
      service.deleteProductCart(productMock.id, cartMock.id),
    ).rejects.toThrowError();
  });

  it('should CartProduct after create', async () => {
    const productCart = await service.createProductInCart(
      inserCartoMock,
      cartMock.id,
    );

    expect(productCart).toEqual(CartProductMock);
  });

  it('should return CartProduct if exists', async () => {
    const productCart = await service.verifyProductInCart(
      productMock.id,
      cartMock.id,
    );

    expect(productCart).toEqual(CartProductMock);
  });

  it('should return error if not found', async () => {
    jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      service.verifyProductInCart(productMock.id, cartMock.id),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should return error if not found', async () => {
    jest.spyOn(cartProductRepository, 'findOne').mockRejectedValue(new Error());

    expect(
      service.verifyProductInCart(productMock.id, cartMock.id),
    ).rejects.toThrowError(Error);
  });

  it('should return error in exception create', async () => {
    jest
      .spyOn(cartProductRepository, 'save')
      .mockRejectedValue(new Error('Error'));

    expect(
      service.createProductInCart(inserCartoMock, cartMock.id),
    ).rejects.toThrowError();
  });
});
