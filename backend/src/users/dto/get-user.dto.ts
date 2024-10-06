import {ApiProperty} from '@nestjs/swagger';

export class GetUserDto {

    @ApiProperty({example: "Hans"})
    username: string;

    @ApiProperty({example: "123456"})
    password: string;

    @ApiProperty({example: ["admin", "user"]})
    roles: string[];

    @ApiProperty({example: 3})
    sub: number;
}