import { Appointment } from "src/appointments/entities/appointment.entity";
import { JobType } from "src/job_types/entities/job_type.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('job_seeker')
export class JobSeeker {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @Column()
    age: number;

    @ManyToOne(() => JobType, (job_type) => job_type.type)
    job_type: JobType;

    @OneToMany(() => Appointment, (appointment) => appointment.job_seeker)
    appointments: Appointment[];
}
