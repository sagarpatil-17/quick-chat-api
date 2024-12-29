import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateRequestDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    status: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    friendId: string
}
