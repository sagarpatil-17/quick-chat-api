import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UserDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    username: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    password: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    email: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    about: string;
}
