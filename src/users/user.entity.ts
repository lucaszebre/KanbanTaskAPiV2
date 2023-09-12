/* eslint-disable prettier/prettier */
import { Board } from 'src/boards/entities/boards.entity';
import { Role } from 'src/enums/role.enum';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    userId: string;


    @Column()
    name: string;

    @Column()
    email: string;
    
    @Column()
    password: string;

    @Column({type:'enum',enum:Role,default:Role.User})
    role: Role;

    @OneToMany(() => Board, (board) => board)
    boards: Board[];
    
}
