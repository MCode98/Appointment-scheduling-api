import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from 'class-transformer';

@Entity('admin')
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    user_name: string;

    @Column()
    @Exclude()
    password: string;
}
