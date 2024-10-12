import {ApiProperty, PartialType} from '@nestjs/swagger';
import { CreateClubDto } from './create-club.dto';
import {IsNotEmpty, IsString} from 'class-validator';
import {Association} from '../../association/entities/association.entity';

export class UpdateClubDto extends PartialType(CreateClubDto) {

    @ApiProperty({example: "TTC Ostermundigen"})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({example: 1})
    @IsNotEmpty()
    @IsString()
    association: Association;
}
