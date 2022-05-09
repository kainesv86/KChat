import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { monoLogger } from "mono-utils-core";
import { Relationship } from "../relationship/entities/relationship.entity";
import { RelationshipStatus } from "../relationship/entities/relationship.enum";
import { User } from "./entities/user.entity";
import { UserRepository } from "./entities/user.repository";
import { RelationshipService } from "src/relationship/relationship.service";
import { FriendRequestDto } from "src/relationship/dto/friendRequest";

@Injectable()
export class UserService {
        constructor(private readonly userRepository: UserRepository, private readonly relationshipService: RelationshipService) {}

        async registerUser(newUser: User): Promise<User> {
                return await this.userRepository.save(newUser);
        }

        async findUserByUsername(username: string): Promise<User> {
                monoLogger.log("KChat-user", username);
                return await this.userRepository.findOne({ username });
        }

        async findRelationship(user: User, friendUser: User): Promise<Relationship> {
                return await this.relationshipService.findOneRelationship(user, friendUser);
        }

        async handleRelationship(user: User, friendRequestDto: FriendRequestDto) {
                const { friendUsername, status } = friendRequestDto;

                const friendUser = await this.findUserByUsername(friendUsername);

                if (status === RelationshipStatus.NONE || status === RelationshipStatus.FRIEND) {
                        //For denied the request or accept or unfriend
                        this.relationshipService.updateRelationshipStatus(user, friendUser, status);

                        //For set relationship to none or friend
                        this.relationshipService.updateRelationshipStatus(friendUser, user, status);
                        return;
                }
        }

        async getUsersRelationByStatus(user: User, status: RelationshipStatus): Promise<User[]> {
                const query = await this.userRepository
                        .createQueryBuilder("user")
                        .select(["user.id", "user.username", "user.email"])
                        .leftJoin("user.relationships", "relationships")
                        .where("relationships.friendUserId = :friendUserId", {
                                friendUserId: user.id,
                        })
                        .andWhere("relationships.status = :status", {
                                status,
                        });

                const result = await query.getMany();

                return result;
        }
}
