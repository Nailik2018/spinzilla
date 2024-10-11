import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Player} from '../../player/entities/player.entity';

@Entity()
export class Gender {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Player, (gender) => gender)
    players: Player[];
}
