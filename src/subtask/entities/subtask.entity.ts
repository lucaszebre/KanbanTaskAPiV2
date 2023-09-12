/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Subtask {
        @PrimaryGeneratedColumn('uuid')
        id: string;
    
        @Column({ nullable: true })
        title: string;
    
        @Column({ default: false })
        isCompleted: boolean;
    
        @Column()
        columnId: string;
    
        @Column()
        boardId: string;
    
        @Column({ nullable: true })
        taskId: string;
}