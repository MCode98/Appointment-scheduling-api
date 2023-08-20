import { Appointment } from "src/appointments/entities/appointment.entity";
import { Consultant } from "src/consultants/entities/consultant.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('available_time')
export class AvailableTime {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp' })
    start_time: Date;

    @Column({ type: 'timestamp' })
    end_time: Date;

    @Column()
    available: boolean;

    @ManyToOne(() => Consultant, (consultant) => consultant.id)
    consultant: Consultant;

    @OneToOne(() => Appointment, appointment => appointment.availableTime, { nullable: true })
    appointment: Appointment;
}
