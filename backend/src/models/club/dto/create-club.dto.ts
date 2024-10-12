import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, IsString} from 'class-validator';
import {Association} from '../../association/entities/association.entity';

export class CreateClubDto {

    @ApiProperty({example: "TTC Ostermundigen"})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({example: 1})
    @IsNotEmpty()
    @IsNumber()
    association: Association;
}
