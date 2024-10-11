import {ApiProperty} from '@nestjs/swagger';

export class NotFoundResponse {

    @ApiProperty({example: 404})
    statusCode: number;

    @ApiProperty({example: 'Not found'})
    error: string;

    @ApiProperty({example: 'Entität konnte nicht gefunden werden!'})
    message: string;
}