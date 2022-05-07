import { Controller, Get, Post, Body, Patch, Param, Req, UseGuards, HttpException, HttpStatus } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserGuard } from "../auth/auth.guard";
import { Request } from "express";
import { monoLogger } from "mono-utils-core";
import { FriendRequestDto } from "../relationship/dto/friendRequest";
import { RelationshipStatus } from "src/relationship/entities/relationship.enum";
import { Relationship } from "src/relationship/entities/relationship.entity";
import { RelationshipService } from "src/relationship/relationship.service";

@Controller("user")
export class UserController {
        constructor(private readonly userService: UserService, private readonly relationshipService: RelationshipService) {}

        @Get("/me")
        @UseGuards(UserGuard)
        getUser(@Req() req: Request) {
                return req.user;
        }

        @Post("/friends/add")
        @UseGuards(UserGuard)
        async addFriendByUsername(@Req() req: Request, @Body() friendRequestDto: FriendRequestDto) {
                const friendUser = await this.userService.findUserByUsername(friendRequestDto.friendUsername);

                if (!friendUser) {
                        throw new HttpException("This user doesn't exist", HttpStatus.NOT_FOUND);
                }

                if (friendUser.username === req.user.username) {
                        throw new HttpException("Nope, you are!", HttpStatus.BAD_REQUEST);
                }

                const existRelationship = await this.userService.findRelationship(req.user, friendUser);

                if (existRelationship) {
                        switch (existRelationship.status) {
                                case RelationshipStatus.PENDING: {
                                        throw new HttpException("You already sent request", HttpStatus.BAD_REQUEST);
                                }

                                case RelationshipStatus.FRIEND: {
                                        throw new HttpException("You two are friend already", HttpStatus.BAD_REQUEST);
                                }

                                case RelationshipStatus.NONE: {
                                        break;
                                }
                        }
                }

                if (!existRelationship) {
                        const creator = new Relationship();
                        creator.user = req.user;
                        creator.friendUser = friendUser;
                        creator.status = RelationshipStatus.PENDING;
                        this.relationshipService.addRelationship(creator);
                }

                return new HttpException({ details: { message: "Send request successfully" } }, HttpStatus.OK);
        }

        @Patch("/friends/handle-status")
        @UseGuards(UserGuard)
        handleFriendRequest(@Req() req: Request, @Body() friendPendingStatusDto: FriendRequestDto) {
                return this.userService.handleRelationship(req.user, friendPendingStatusDto);
        }

        @Get("/friends/status=:status")
        @UseGuards(UserGuard)
        getUserByStatus(@Req() req: Request, @Param("status") status: RelationshipStatus) {
                return this.userService.getUsersRelationByStatus(req.user, status);
        }

        // @Patch(':id')
        // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        //   return this.userService.update(+id, updateUserDto);
        // }

        // @Delete(':id')
        // remove(@Param('id') id: string) {
        //   return this.userService.remove(+id);
        // }
}
