import {Controller, Get, Post, Body, UseGuards,} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { ApiTokenGuard } from 'src/guards/api-token/api-token.guard';

@Controller('location')
@UseGuards(ApiTokenGuard)   
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  create(@Body() dto: CreateLocationDto) {
    return this.locationService.create(dto);
  }

  @Get()
  findAll() {
    return this.locationService.findAll();
  }
}