import {ApiProperty, PartialType} from '@nestjs/swagger';
import { CreatePlayerDto } from './create-player.dto';
import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {

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
}
