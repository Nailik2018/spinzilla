import {ApiProperty, PartialType} from '@nestjs/swagger';
import {CreateAssociationDto} from './create-association.dto';
import {IsNotEmpty, IsString} from 'class-validator';

export class UpdateAssociationDto extends PartialType(CreateAssociationDto) {

    @ApiProperty({example: "Mittelländischer Tischtennisverband"})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({example: "MTTV"})
    @IsNotEmpty()
    @IsString()
    displayName: string;
}
