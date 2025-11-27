import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from 'src/token/entities/token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ApiTokenGuard implements CanActivate {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const tokenFromHeader = request.headers['x-api-token'];

    if (!tokenFromHeader) {
      throw new ForbiddenException('Token requerido');
    }

    const token = await this.tokenRepository.findOne({
      where: { token: tokenFromHeader },
    });

    if (!token) {
      throw new ForbiddenException('Token inválido');
    }

    if (!token.active || token.reqLeft <= 0) {
      throw new ForbiddenException('Token no usable');
    }

    return true;
  }
}