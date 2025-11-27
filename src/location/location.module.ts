import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from 'src/token/entities/token.entity';

@Module({
  controllers: [LocationController],
  providers: [LocationService],
  imports: [
    TypeOrmModule.forFeature([Location, Token])
  ]
})
export class LocationModule {}