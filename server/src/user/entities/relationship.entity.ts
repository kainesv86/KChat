import {
  Check,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RelationshipStatus } from './relationship.enum';
import { User } from './user.entity';

@Entity()
export class Relationship {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.username)
  user: User;

  @ManyToOne(() => User, (user) => user.username)
  friendUser: User;

  @Column()
  status: RelationshipStatus;
}
