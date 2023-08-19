import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from 'class-transformer';

@Entity('admin')
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({default: null})
    user_name: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;
}