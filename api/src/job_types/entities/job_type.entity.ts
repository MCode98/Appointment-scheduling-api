import { Consultant } from "src/consultants/entities/consultant.entity";
import { JobSeeker } from "src/job_seekers/entities/job_seeker.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('job_type')
export class JobType {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    type: string;

    @OneToMany(() => Consultant, (consultant) => consultant.job_type)
    consultants: Consultant[];

    @OneToMany(() => JobSeeker, (job_seeker) => job_seeker.job_type)
    job_seekers: JobSeeker[];
}
