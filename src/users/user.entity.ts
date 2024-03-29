/* eslint-disable prettier/prettier */
import { Board } from 'src/boards/entities/boards.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column()
    name: string;

    @Column({ unique: true })
    email: string;
    
    @Column()
    password: string;


    @OneToMany(() => Board, (board) => board.user,{ cascade: true })
    boards: Board[];
}
