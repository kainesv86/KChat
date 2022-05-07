import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Relationship } from '../../relationship/entities/relationship.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  avatarUrl: string;

  @Column()
  description: string;

  @OneToMany(() => Relationship, (relationship) => relationship.user)
  relationships: Relationship[];
}
