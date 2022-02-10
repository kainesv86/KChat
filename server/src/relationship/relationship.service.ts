import { Injectable } from '@nestjs/common';
import { RelationshipRepository } from './entities/relationship.repository';

@Injectable()
export class RelationshipService {
  constructor(
    private readonly relationshipRepository: RelationshipRepository,
  ) {}

  async addRelationship() {}

  findOne(id: number) {
    return `This action returns a #${id} relationship`;
  }
}
