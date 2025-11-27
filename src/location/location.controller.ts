import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ApiTokenGuard } from 'src/guards/api-token/api-token.guard';

@Controller('location')
@UseGuards(ApiTokenGuard)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}
  
  @Get()
  findAll() {
    return this.locationService.findAll();
  }
}