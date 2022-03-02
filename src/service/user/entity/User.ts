import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_name' })
    userName: string;

    @Column({ name: 'password' })
    password: string;

}
