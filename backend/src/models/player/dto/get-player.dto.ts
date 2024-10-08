import {ApiProperty} from '@nestjs/swagger';

export class GetPlayerDto {

    @ApiProperty({example: 1})
    licenseNr: number;

    @ApiProperty({example: "Hans"})
    firstname: string;

    @ApiProperty({example: "Mustermann"})
    lastname: string;
}