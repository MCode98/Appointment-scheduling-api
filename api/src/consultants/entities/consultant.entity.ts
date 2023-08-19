import { AvailableTime } from "src/available_times/entities/available_time.entity";
import { JobType } from "src/job_types/entities/job_type.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('consultant')
export class Consultant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    country: string;

    @ManyToOne(() => JobType, (job_type) => job_type.type)
    job_type: JobType;

    @OneToMany(() => AvailableTime, (available_time) => available_time.consultant)
    available_times: AvailableTime[]
}
