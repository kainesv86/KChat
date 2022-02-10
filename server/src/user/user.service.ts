import { Injectable } from '@nestjs/common';
import { monoLogger } from 'mono-utils-core';
import { Relationship } from '../relationship/entities/relationship.entity';
import { RelationshipStatus } from '../relationship/entities/relationship.enum';
import { User } from './entities/user.entity';
import { UserRepository } from './entities/user.repository';
import { RelationshipService } from 'src/relationship/relationship.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly relationshipService: RelationshipService,
  ) {}
  async registerUser(newUser: User): Promise<User> {
    return await this.userRepository.save(newUser);
  }

  async findUserByUsername(username: string): Promise<User> {
    monoLogger.log('KChat-user', username);
    return await this.userRepository.findOne({ username });
  }

  async addFriendByUsername(
    user: User,
    friendRequestDto: FriendRequestDto,
  ): Promise<string> {
    const friendUser = await this.findUserByUsername(
      friendRequestDto.friendUsername,
    );
    if (!friendUser) return "This user doesn't exist";

    if (friendUser.username === user.username) return 'Nope, you are';

    const existRelationship =
      await this.relationshipService.findOneRelationship(user, friendUser);

    if (existRelationship) return 'You already sent request';

    const creator = new Relationship();
    creator.user = user;
    creator.friendUser = friendUser;
    creator.status = RelationshipStatus.PENDING;

    this.relationshipService.addRelationship(creator);

    return 'Send request successfully';
  }

  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  // findAll() {
  //   return `This action returns all user`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
