import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SendMessageDto } from './dto/send-message.dto';
import { GroupService } from './group.service';

@WebSocketGateway({ cors: true })
export class GroupGateway {
    @WebSocketServer()
    server: Server;

    constructor(private readonly groupService: GroupService) { }

    @SubscribeMessage('sendMessageToGroup')
    async handleSendMessage(
        @MessageBody() data: SendMessageDto
    ): Promise<any> {
        const message = await this.groupService.sendMessageToGroup(data);
        this.server.emit('sendMessageToGroup', message);
    }
}
