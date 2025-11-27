import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { ApiTokenGuard } from 'src/guards/api-token/api-token.guard';

@Controller('character')
@UseGuards(ApiTokenGuard)
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}
  
  @Get()
  findAll() {
    return this.characterService.findAll();
  }
}