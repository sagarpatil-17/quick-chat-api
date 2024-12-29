import { Module } from "@nestjs/common";
import { GroupController } from "./group.controller";
import { GroupService } from "./group.service";
import { PrismaService } from "src/prisma-service/prisma.service";
import { GroupGateway } from "./group.gateway";

@Module({
    controllers: [GroupController],
    providers: [GroupService, GroupGateway, PrismaService]
})

export class GroupModule { }