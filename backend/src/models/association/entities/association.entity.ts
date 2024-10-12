import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Club} from '../../club/entities/club.entity';

@Entity()
export class Association {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    displayName: string;

    @OneToMany(() => Club, (club: Club) => club.association)
    clubs: Club[];
}
