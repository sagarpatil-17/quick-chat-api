import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GroupService } from "./group.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { AUTH } from "src/guards/auth.decorator";

@ApiTags('GroupController')
@Controller('group')
export class GroupController {

    constructor(private readonly groupService: GroupService) { }

    @AUTH()
    @Post('create')
    async createGroup(@Body() dto: CreateGroupDto, @Req() req: any) {
        return await this.groupService.createGroup(dto, req['user']);
    }

    // @AUTH()
    @Get('all')
    async getAllGroups() {
        return await this.groupService.getAllGroups();
    }

    @AUTH()
    @Get('my')
    async getMyGroups(@Req() req: any) {
        return await this.groupService.getMyGroups(req['user']);
    }

    @AUTH()
    @Post('join/:groupId')
    async joinGroup(@Param('groupId') groupId: String, @Req() req: any) {
        return await this.groupService.joinGroup(groupId, req['user']);
    }

    @AUTH()
    @Get('messages/:groupId')
    async groupMessages(@Param('groupId') groupId: string) {
        return await this.groupService.groupMessages(groupId);
    }

}