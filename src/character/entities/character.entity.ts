import { Column, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn, JoinTable, } from 'typeorm';
import { Location } from 'src/location/entities/location.entity';

@Entity()
export class Character {
  @PrimaryGeneratedColumn()          
  id: number;

  @Column()
  name: string;

  @Column('float')
  salary: number;

  @Column()
  employee: boolean;

  // Propiedad (1–1 con Location)
  @OneToOne(() => Location, (location) => location.owner, {
    nullable: true,
  })
  property?: Location;

  // Favoritos (N–N con Location)
  @ManyToMany(() => Location, (location) => location.favCharacters, {
    cascade: true,
  })
  @JoinTable()
  favPlaces: Location[];
}