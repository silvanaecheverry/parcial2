import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from './entities/character.entity';
import { CreateCharacterDto } from './dto/create-character.dto';
import { Location } from 'src/location/entities/location.entity';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  // post
  async create(createCharacterDto: CreateCharacterDto) {
    const character = this.characterRepository.create(createCharacterDto);
    return this.characterRepository.save(character);
  }

  // patch
  async addFavorite(id: number, locationId: number) {
    const character = await this.characterRepository.findOne({
      where: { id },
      relations: ['favPlaces'],
    });

    if (!character) {
      throw new NotFoundException('Personaje no encontrado');
    }

    const location = await this.locationRepository.findOne({
      where: { id: locationId },
    });

    if (!location) {
      throw new NotFoundException('Locación no encontrada');
    }

    // no duplicados
    if (
      character.favPlaces &&
      character.favPlaces.some((l) => l.id === location.id)
    ) {
      throw new BadRequestException('La locación ya es favorita');
    }

    character.favPlaces = [...(character.favPlaces || []), location];

    return this.characterRepository.save(character);
  }

  // get
  async calculateTaxes(id: number) {
    const character = await this.characterRepository.findOne({
      where: { id },
      relations: ['property'],
    });

    if (!character) {
      throw new NotFoundException('Personaje no encontrado');
    }

    if (!character.property) {
      return { taxDebt: 0 };
    }

    const coef = character.employee ? 0.08 : 0.03;
    const taxDebt = character.property.cost * (1 + coef);

    return { taxDebt };
  }

  async findOne(id: number) {
    const c = await this.characterRepository.findOne({
      where: { id },
      relations: ['property', 'favPlaces'],
    });

    if (!c) throw new NotFoundException('Personaje no encontrado');

    return c;
  }
}