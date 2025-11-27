import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Location } from 'src/location/entities/location.entity';
import { Token } from 'src/token/entities/token.entity';
import { ApiTokenGuard } from 'src/guards/api-token/api-token.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Character, Location, Token])],
  controllers: [CharacterController],
  providers: [CharacterService, ApiTokenGuard],
})
export class CharacterModule {}