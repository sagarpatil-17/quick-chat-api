import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserService } from './user.service';
import { MessageDto } from './dto/message.dto';

@WebSocketGateway({ cors: true })
export class GroupGateway {
    @WebSocketServer()
    server: Server;

    constructor(private readonly userService: UserService) { }

    @SubscribeMessage('sendMessageToGroup')
    async handleSendMessage(
        @MessageBody() data: MessageDto
    ): Promise<any> {
        const message = await this.userService.sendMessage(data);
        this.server.emit('sendMessage', message);
    }
}
