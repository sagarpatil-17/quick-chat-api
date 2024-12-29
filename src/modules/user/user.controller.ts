import { Body, Controller, Get, Param, Patch, Post, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { AUTH } from "src/guards/auth.decorator";
import { UpdateRequestDto } from "./dto/updateRequest.dto";

@ApiTags('UserController')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('all')
    async getAllUsers() {
        return await this.userService.getAllUsers();
    }

    @Patch('update/:userId')
    async updateUser(@Param('userId') userId: string, @Body() dto: UserDto) {
        return await this.userService.updateUser(userId, dto);
    }

    @Get('search/:searchText')
    async searchUser(@Param('searchText') searchText: string) {
        return await this.userService.searchUser(searchText);
    }

    @AUTH()
    @Post('request/:friendId')
    async sendRequest(@Param('friendId') friendId: string, @Req() req: any) {
        return await this.userService.sendRequest(friendId, req['user']);
    }

    @AUTH()
    @Get('requests')
    async getRequests(@Req() req: any) {
        return await this.userService.getRequests(req['user']);
    }

    @AUTH()
    @Patch('request/:id')
    async updateRequest(@Param('id') id: string, @Body() dto: UpdateRequestDto, @Req() req: any) {
        return await this.userService.updateRequest(id, dto, req['user'])
    }

    @AUTH()
    @Get('friendList')
    async getFriendList(@Req() req: any) {
        return await this.userService.getFriendList(req['user']);
    }

    @AUTH()
    @Get('messages/:friendId')
    async userMessages(@Param('friendId') friendId: string, @Req() req: any) {
        return await this.userService.userMessages(friendId, req['user']);
    }
}