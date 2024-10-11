import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, IsString} from 'class-validator';
import {Gender} from '../../gender/entities/gender.entity';

export class CreatePlayerDto {

    @ApiProperty({example: "2"})
    @IsNotEmpty()
    @IsNumber()
    licenseNr: number;

    @ApiProperty({example: "Kevin"})
    @IsNotEmpty()
    @IsString()
    firstname: string;

    @ApiProperty({example: "Mustermann"})
    @IsNotEmpty()
    @IsString()
    lastname: string;

    @ApiProperty({example: "1"})
    @IsNotEmpty()
    @IsNumber()
    gender: Gender;
}
