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

  
  @OneToOne(() => Location, (location) => location.owner, {
    nullable: true,
  })
  property?: Location;


  @ManyToMany(() => Location, (location) => location.favCharacters, {
    cascade: true,
  })
  @JoinTable()
  favPlaces: Location[];
}