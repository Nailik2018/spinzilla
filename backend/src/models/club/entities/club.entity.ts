import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Association} from '../../association/entities/association.entity';

@Entity()
export class Club {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Association, association => association.clubs,
        {
            cascade: true,
            eager: true
        })
    @JoinColumn({name: "association_id"})
    association: Association;
}
