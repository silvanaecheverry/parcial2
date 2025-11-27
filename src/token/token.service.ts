import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './entities/token.entity';

@Injectable()
export class TokenService {

  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  // Crear token

  async create(createTokenDto: CreateTokenDto) {
    const newToken = this.tokenRepository.create({
      token:
        'tok-' +
        Math.random().toString(36).substring(2),
      active: true,
      reqLeft: 10,
    });

    return await this.tokenRepository.save(newToken);
  }

  
  // encontrar
  
  async findOne(id: string) {
    const token = await this.tokenRepository.findOneBy({ id });

    if (!token) throw new NotFoundException('Token no encontrado');

    return {
      usable: token.active && token.reqLeft > 0,
    };
  }
  // reducir token
  async reduce(id: string) {
    const token = await this.tokenRepository.findOneBy({ id });

    if (!token) throw new NotFoundException('Token no encontrado');

    if (token.reqLeft > 0) {
      token.reqLeft -= 1;
    }

    return await this.tokenRepository.save(token);
  }
}