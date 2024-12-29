import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma-service/prisma.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { SendMessageDto } from "./dto/send-message.dto";

@Injectable()
export class GroupService {

    constructor(private readonly prisma: PrismaService) { }

    async createGroup(dto: CreateGroupDto, req) {
        const group = await this.prisma.groups.create({
            data: {
                ...dto,
                createdBy: req.id
            }
        })

        await this.prisma.groupsOnUsers.create({
            data: {
                userId: req.id,
                groupId: group.id
            }
        })

        return { message: 'Group created successfully!' }
    }

    async getAllGroups() {
        return await this.prisma.groups.findMany({
            include: { users: true }
        });
    }

    async getMyGroups(req) {
        return await this.prisma.groupsOnUsers.findMany({
            where: { userId: req.id },
            include: { group: true }
        })
    }

    async joinGroup(groupId, req) {
        return await this.prisma.groupsOnUsers.create({
            data: {
                userId: req.id,
                groupId: groupId
            }
        })
    }

    async groupMessages(groupId) {
        const [groupInfo, messages] = await this.prisma.$transaction([
            this.prisma.groups.findUnique({
                where: { id: groupId }
            }),
            this.prisma.group_messages.findMany({
                where: { groupId: groupId },
                include: { sender: { select: { username: true } } }
            })
        ]);

        return [groupInfo, messages]
    }

    async sendMessageToGroup(data: SendMessageDto) {
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