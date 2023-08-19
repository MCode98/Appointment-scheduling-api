import { Consultant } from "src/consultants/entities/consultant.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('available_time')
export class AvailableTime {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    start_time: Date;

    @Column()
    end_time: Date;

    @Column()
    available: boolean;

    @ManyToOne(() => Consultant, (consultant) => consultant.id)
    consultant: Consultant;
}
