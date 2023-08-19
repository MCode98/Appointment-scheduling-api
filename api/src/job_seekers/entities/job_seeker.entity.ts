import { Appointment } from "src/appointments/entities/appointment.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from 'class-transformer';
@Entity('job_seeker')
export class JobSeeker {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;    

    @OneToMany(() => Appointment, (appointment) => appointment.job_seeker)
    appointments: Appointment[];
}
