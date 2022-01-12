import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Relationship {
  @PrimaryGeneratedColumn()
  id: number;
}
