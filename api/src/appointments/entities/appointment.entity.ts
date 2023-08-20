import { AvailableTime } from "src/available_times/entities/available_time.entity";
import { JobSeeker } from "src/job_seekers/entities/job_seeker.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('appointment')
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    booking_date: Date;

    @OneToOne(() => AvailableTime, { nullable: true })
    @JoinColumn()
    availableTime: AvailableTime;

    @Column()
    status: string;

    @ManyToOne(() => JobSeeker, (job_seeker) => job_seeker.id)
    job_seeker: JobSeeker;
}
