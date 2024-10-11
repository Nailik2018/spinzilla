import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn} from 'typeorm';
import {Gender} from '../../gender/entities/gender.entity';

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

    @ManyToOne(() => Gender, gender => gender.players,
        {
            cascade: true,
            eager: true // Lädt die Beziehung automatisch, wenn die Entität geladen wird
        })
    @JoinColumn({name: "gender_id"})
    gender: Gender;
}
