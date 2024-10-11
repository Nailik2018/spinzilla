import {ApiProperty, PartialType} from '@nestjs/swagger';
import {CreateGenderDto} from './create-gender.dto';
import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class UpdateGenderDto extends PartialType(CreateGenderDto) {

    @ApiProperty({example: "male"})
    @IsNotEmpty()
    @IsString()
    name: string;
}
