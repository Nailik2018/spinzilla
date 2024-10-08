import {ApiProperty} from '@nestjs/swagger';

export class DeleteResponseOk {

    @ApiProperty({example: 200})
    statusCode: number = 200;

    @ApiProperty({example: 'Eintrag wurde erfolgreich gelöscht!'})
    message: string

    constructor(message: string) {
        this.message = message;
    }
}