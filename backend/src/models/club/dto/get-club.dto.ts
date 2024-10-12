import {ApiProperty} from '@nestjs/swagger';
import {Association} from '../../association/entities/association.entity';

export class GetClubDto {

    @ApiProperty({example: 1})
    id: number;

    @ApiProperty({example: "TTC Ostermundigen"})
    name: string;

    @ApiProperty({example: 1})
    association: Association;
}