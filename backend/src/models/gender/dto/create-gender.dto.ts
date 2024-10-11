import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class CreateGenderDto {

    @ApiProperty({example: "male"})
    @IsNotEmpty()
    @IsString()
    name: string;
}
