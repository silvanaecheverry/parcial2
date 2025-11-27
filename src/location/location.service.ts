import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { Character } from 'src/character/entities/character.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
  ) {}

  // post
  async create(createLocationDto: CreateLocationDto) {
    const { ownerId, ...data } = createLocationDto;

    const owner = await this.characterRepository.findOne({
      where: { id: ownerId },
      relations: ['property'],
    });

    if (!owner) {
      throw new BadRequestException('El dueño no existe');
    }

    if (owner.property) {
      throw new BadRequestException('El dueño ya tiene una propiedad');
    }

    const location = this.locationRepository.create({
      ...data,
      owner,
    });

    return this.locationRepository.save(location);
  }

  // get  
  async findAll() {
    return this.locationRepository.find({
      relations: ['favCharacters', 'owner'],
    });
  }

  async findOne(id: number) {
    const loc = await this.locationRepository.findOne({
      where: { id },
      relations: ['owner', 'favCharacters'],
    });

    if (!loc) throw new NotFoundException('Location no encontrada');

    return loc;
  }
}