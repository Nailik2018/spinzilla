import {ApiProperty} from '@nestjs/swagger';
import {Gender} from '../../gender/entities/gender.entity';

export class GetPlayerDto {

    @ApiProperty({example: 1})
    licenseNr: number;

    @ApiProperty({example: "Hans"})
    firstname: string;

    @ApiProperty({example: "Mustermann"})
    lastname: string;

    @ApiProperty({example: 1})
    gender: Gender;
}