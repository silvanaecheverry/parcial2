import { Column, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn, JoinColumn, } from 'typeorm';
import { Character } from 'src/character/entities/character.entity';
  
  @Entity()
  export class Location {
    @PrimaryGeneratedColumn()          
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    type: string;
  
    @Column('float')
    cost: number;
  
    @OneToOne(() => Character, (character) => character.property, {
      nullable: true,
    })
    @JoinColumn()
    owner?: Character;
  
    
    @ManyToMany(() => Character, (character) => character.favPlaces)
    favCharacters: Character[];
  }