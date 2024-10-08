import {ApiProperty} from '@nestjs/swagger';

export class BadRequestResponse {

    @ApiProperty({example: 400})
    statusCode: number;

    @ApiProperty({example: 'Bad request'})
    error: string;

    @ApiProperty({example: 'Attribut darf nicht leer sein und oder hat einen Datentypen definiert der zwingend notwendig ist!'})
    message: string
}