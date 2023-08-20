import { AvailableTime } from "src/available_times/entities/available_time.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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
    available_times: AvailableTime[];

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @DeleteDateColumn()
    deleted_at: Date;
}
