import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma-service/prisma.service";
import { UserDto } from "./dto/user.dto";
import { encryptPassword } from "src/helpers/auth.hash";
import { UpdateRequestDto } from "./dto/updateRequest.dto";
import { MessageDto } from "./dto/message.dto";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async getAllUsers() {
        return await this.prisma.users.findMany();
    }

    async updateUser(userId, dto: UserDto) {
        const data = { ...dto };

        if (dto.password) {
            data.password = await encryptPassword(dto.password);
        }

        return this.prisma.users.update({
            where: { id: userId },
            data,
        });
    }

    async searchUser(searchText) {
        return await this.prisma.users.findMany({
            where: { username: { contains: searchText } },
            include: { receivedFriendRequests: true }
        })
    }

    async sendRequest(friendId, req) {
        return await this.prisma.friend_requests.create({
            data: {
                senderId: req.id,
                receiverId: friendId,
            }
        })
    }

    async getRequests(req) {
        return await this.prisma.friend_requests.findMany({
            where: { receiverId: req.id, status: 'pending' },
            include: { sender: true }
        })
    }

    async updateRequest(id: string, dto: UpdateRequestDto, req) {
        const updatedRequest = await this.prisma.friend_requests.update({
            where: { id },
            data: { status: dto.status },
        });

        // If the status is 'accepted', create the friendship records
        if (dto.status === 'accepted') {
            await this.prisma.$transaction([
                this.prisma.friends.create({
                    data: {
                        userId: req.id,
                        friendId: dto.friendId,
                    },
                }),
                this.prisma.friends.create({
                    data: {
                        userId: dto.friendId,
                        friendId: req.id,
                    },
                }),
            ]);
        }

        if (dto.status === 'rejected') {
            await this.prisma.friend_requests.delete({
                where: { id: id }
            })
        }

        return { message: `Request ${dto.status}` };
    }

    async getFriendList(req) {
        return await this.prisma.friends.findMany({
            where: { userId: req.id },
            include: { friend: true }
        });
    }

    async userMessages(friendId, req) {
        return await this.prisma.messages.findMany({
            where: {
                OR: [
                    { senderId: friendId, receiverId: req.id },
                    { senderId: req.id, receiverId: friendId },
                ],
            },
            orderBy: { timestamp: 'asc' },
        })
    }

    async sendMessage(data: MessageDto) {
        const { groupId, senderId, content } = data;

        // Ensure the sender is part of the group
        const isMember = await this.prisma.groupsOnUsers.findFirst({
            where: {
                groupId,
                userId: senderId,
            },
        });

        if (!isMember) {
            throw new Error("Sender is not a member of the group");
        }

        // Save the message
        return await this.prisma.group_messages.create({
            data: {
                groupId,
                senderId,
                content,
            },
            include: {
                sender: true, // Include sender details
            },
        });
    }

}