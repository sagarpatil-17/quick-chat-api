import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class MessageDto {

    @ApiProperty()
    @IsString()
    groupId: string;

    @ApiProperty()
    @IsString()
    senderId: string;

    @ApiProperty()
    @IsString()
    content: string;
}
