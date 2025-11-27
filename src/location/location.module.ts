import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Token } from 'src/token/entities/token.entity';
import { Character } from 'src/character/entities/character.entity';
import { ApiTokenGuard } from 'src/guards/api-token/api-token.guard';

@Module({
  controllers: [LocationController],
  providers: [LocationService, ApiTokenGuard],
  imports: [
    TypeOrmModule.forFeature([Location, Character, Token]),
  ],
})
export class LocationModule {}