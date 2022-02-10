import { RelationshipStatus } from '../entities/relationship.enum';

export interface FriendRequestDto {
  friendUsername: string;
  status: RelationshipStatus;
}
