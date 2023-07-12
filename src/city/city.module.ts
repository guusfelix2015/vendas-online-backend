import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { CacheModule as CacheModuleNest } from '@nestjs/cache-manager';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CityEntity]),
    CacheModuleNest.register({
      ttl: 60 * 60 * 24,
    }),
    CacheModule,
  ],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
