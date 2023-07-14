import { Test, TestingModule } from '@nestjs/testing';

import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AddressService } from '../address.service';
import { AddressEntity } from '../entities/address.entity';
import { UserService } from '../../user/user.service';
import { CityService } from '../../city/city.service';
import { addressMock } from '../__mocks__/address.mock';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { cityMock } from '../../city/__mocks__/city.mock';

describe('AddressService', () => {
  let service: AddressService;
  let addressRepository: Repository<AddressEntity>;
  let userService: UserService;
  let cityService: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: UserService,
          useValue: {
            findUserById: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        {
          provide: CityService,
          useValue: {
            findCityById: jest.fn().mockResolvedValue(cityMock),
          },
        },
        {
          provide: getRepositoryToken(AddressEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(addressMock),
          },
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    userService = module.get<UserService>(UserService);
    cityService = module.get<CityService>(CityService);
    addressRepository = module.get<Repository<AddressEntity>>(
      getRepositoryToken(AddressEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cityMock).toBeDefined();
    expect(userService).toBeDefined();
    expect(addressRepository).toBeDefined();
  });

  it('should create address', async () => {
    const address = await service.createAddress(addressMock, userEntityMock.id);

    expect(address).toEqual(addressMock);
  });

  it('should return error exception UserService', async () => {
    jest.spyOn(userService, 'findUserById').mockRejectedValue(new Error());

    await expect(
      service.createAddress(addressMock, userEntityMock.id),
    ).rejects.toThrowError();
  });

  it('should return error exception CityService', async () => {
    jest.spyOn(cityService, 'findCityById').mockRejectedValue(new Error());

    await expect(
      service.createAddress(addressMock, userEntityMock.id),
    ).rejects.toThrowError();
  });

  it('should return error exception userService', async () => {
    jest.spyOn(userService, 'findUserById').mockRejectedValue(new Error());

    await expect(
      service.createAddress(addressMock, userEntityMock.id),
    ).rejects.toThrowError();
  });
});
