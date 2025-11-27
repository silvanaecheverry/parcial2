import {Controller, Post, Body, UseGuards, Patch, Param, Get, ParseIntPipe,} from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { ApiTokenGuard } from 'src/guards/api-token/api-token.guard';

@Controller('character')
@UseGuards(ApiTokenGuard)   
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  create(@Body() dto: CreateCharacterDto) {
    return this.characterService.create(dto);
  }

  @Patch(':id/favorites/:locationId')
  addFavorite(
    @Param('id', ParseIntPipe) id: number,
    @Param('locationId', ParseIntPipe) locationId: number,
  ) {
    return this.characterService.addFavorite(id, locationId);
  }

  @Get(':id/taxes')
  taxes(@Param('id', ParseIntPipe) id: number) {
    return this.characterService.calculateTaxes(id);
  }
}