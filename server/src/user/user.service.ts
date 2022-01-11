import { Injectable } from '@nestjs/common';
import { monoLogger } from 'mono-utils-core';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './entities/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
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
    monoLogger.log('KChat-FriendPending', friendUser);
    if (!friendUser.pendingAddFriends) {
      friendUser.pendingAddFriends = new Array<string>();
    }
    friendUser.pendingAddFriends.push(friendUser.username);
    this.userRepository.save(friendUser);
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
