import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { Relationship } from './entities/relationship.entity';
import { RelationshipStatus } from './entities/relationship.enum';
import { RelationshipRepository } from './entities/relationship.repository';

@Injectable()
export class RelationshipService {
  constructor(
    private readonly relationshipRepository: RelationshipRepository,
  ) {}

  async addRelationship(relationship: Relationship): Promise<Relationship> {
    return await this.relationshipRepository.save(relationship);
  }

  async findOneRelationship(user, friendUser: User): Promise<Relationship> {
    return await this.relationshipRepository.findOne({ user, friendUser });
  }

  async updateRelationshipStatus(
    user,
    friendUser: User,
    status: RelationshipStatus,
  ): Promise<void> {
    await this.relationshipRepository.save({ user, friendUser, status });
  }

  async findRelationship(
    user?: User,
    friendUser?: User,
  ): Promise<Array<Relationship>> {
    // Get all pending request user friends
    if (!user) {
      return await this.relationshipRepository.find({
        friendUser,
        status: RelationshipStatus.PENDING,
      });
    }

    // Get all friends
    if (!friendUser) {
      return await this.relationshipRepository.find({
        user,
        status: RelationshipStatus.FRIEND,
      });
    }
  }
}
