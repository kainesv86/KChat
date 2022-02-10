import { RelationshipStatus } from '../entities/relationship.enum';

export interface FriendRequestDto {
  friendUsername: string;
}

export interface FriendPendingStatusDto {
  friendUsername: string;
  status: RelationshipStatus;
}
