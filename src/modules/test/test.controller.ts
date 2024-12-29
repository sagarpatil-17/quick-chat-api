import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AUTH } from "src/guards/auth.decorator";

@ApiTags('TestController')
@Controller('test')
export class TestController {

    @Get('server')
    async testServer() {
        return await { message: 'Server is stared!' }
    }

}