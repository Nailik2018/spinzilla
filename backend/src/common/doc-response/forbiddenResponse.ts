import {ApiProperty} from '@nestjs/swagger';

export class ForbiddenResponse {

    @ApiProperty({example: 403})
    statusCode: number;

    @ApiProperty({example: 'Forbidden'})
    error: string;

    @ApiProperty({example: 'Der Zugriff auf diese Ressource ist auf localhost beschränkt!'})
    message: string
}