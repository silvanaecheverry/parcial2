import { Controller, Get, Post, Param, Patch } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  // post
  @Post()
  create() {
    return this.tokenService.create({});
  }

  // get
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tokenService.findOne(id);
  }

  // patch
  @Patch('reduce/:id')
  reduce(@Param('id') id: string) {
    return this.tokenService.reduce(id);
  }
}


