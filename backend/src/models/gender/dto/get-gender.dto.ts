import {ApiProperty} from '@nestjs/swagger';

export class GetGenderDto {

    @ApiProperty({example: 1})
    id: number;

    @ApiProperty({example: "Male"})
    name: string;
}