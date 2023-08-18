import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    full_name: string;

    @Column({ nullable: true})
    dob: Date;

    @Column({ nullable: true})
    loan_balance: number;

    @Column({ nullable: true})
    used_amount: number;

    @Column({ nullable: true})
    installment_plan: string;

    @Column({ unique: true})
    email: string;

    @Column()
    password: string;
}