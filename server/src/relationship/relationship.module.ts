import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelationshipRepository } from './entities/relationship.repository';
import { RelationshipService } from './relationship.service';

@Module({
  imports: [TypeOrmModule.forFeature([RelationshipRepository])],
  providers: [RelationshipService],
  exports: [RelationshipService],
})
export class RelationshipModule {}
