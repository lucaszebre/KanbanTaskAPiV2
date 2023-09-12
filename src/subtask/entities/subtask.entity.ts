/* eslint-disable prettier/prettier */
import { Task } from 'src/tasks/entities/tasks.entity';
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';

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
      
        @ManyToOne(() => Task, (task) => task.subtasks)
        @JoinColumn({ name: 'taskId' })
        task: Task;
}