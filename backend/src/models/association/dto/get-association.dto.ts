import {ApiProperty} from '@nestjs/swagger';

export class GetAssociationDto {

    @ApiProperty({example: 1})
    id: number;

    @ApiProperty({example: "Mittelländischer Tischtennisverband"})
    name: string;

    @ApiProperty({example: "MTTV"})
    displayName: string;
}