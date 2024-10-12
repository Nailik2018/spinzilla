import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';
import {Association} from '../../association/entities/association.entity';

export class CreateClubDto {

    @ApiProperty({example: "TTC Ostermundigen"})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({example: 1})
    @IsNotEmpty()
    @IsString()
    association: Association;
}
