import { Column, Entity, PrimaryColumn} from "typeorm";

@Entity('token_id')
export class TokenId {
    @PrimaryColumn()
    key: string;
  
    @Column()
    value: string;
}
