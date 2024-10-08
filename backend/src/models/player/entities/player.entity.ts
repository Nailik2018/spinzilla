import {Column, Entity, PrimaryColumn} from 'typeorm';

@Entity()
export class Player {

    @PrimaryColumn()
    licenseNr: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    // @Column()
    // club: Club;

    // @Column
    // gender: Gender
}
