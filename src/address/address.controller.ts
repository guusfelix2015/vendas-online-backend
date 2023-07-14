import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Get,
} from '@nestjs/common';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressService } from './address.service';
import { AddressEntity } from './entities/address.entity';
import { UserId } from 'src/decorators/user-id.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { ReturnAddressDto } from './dtos/returnAddress.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Roles(UserType.User)
  @Post()
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body() createAddressDto: CreateAddressDto,
    @UserId() userId: number,
  ): Promise<AddressEntity> {
    console.log(userId);
    return await this.addressService.createAddress(createAddressDto, userId);
  }

  @Roles(UserType.User, UserType.Admin)
  @Get()
  async findAddressesByUserId(
    @UserId() userId: number,
  ): Promise<ReturnAddressDto[]> {
    return (await this.addressService.findAddressesByUserId(userId)).map(
      (address) => new ReturnAddressDto(address),
    );
  }
}
