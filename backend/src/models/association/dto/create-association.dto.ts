import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';

export class CreateAssociationDto {

    @ApiProperty({example: "Mittelländischer Tischtennisverband"})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({example: "MTTV"})
    @IsNotEmpty()
    @IsString()
    displayName: string;
}
