import { JobSeeker } from "src/job_seekers/entities/job_seeker.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('appointment')
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    booking_date: Date;

    @Column()
    available_time_id: number;

    @ManyToOne(() => JobSeeker, (job_seeker) => job_seeker.id)
    job_seeker: JobSeeker;
}
