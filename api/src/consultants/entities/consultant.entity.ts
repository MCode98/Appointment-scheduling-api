import { AvailableTime } from "src/available_times/entities/available_time.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from 'class-transformer';

@Entity('consultant')
export class Consultant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    country: string;

    @Column()
    job_type: string;

    @OneToMany(() => AvailableTime, (available_time) => available_time.consultant)
    available_times: AvailableTime[]
}
