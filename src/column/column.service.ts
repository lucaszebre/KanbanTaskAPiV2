/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Columns } from './entities/column.entity';
import { Repository } from 'typeorm';
import { Task } from 'src/tasks/entities/tasks.entity';
import { Subtask } from 'src/subtask/entities/subtask.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(Columns)
    private readonly columnRepository: Repository<Columns>,

    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task> , 
    @InjectRepository(Subtask)
    private readonly subtaskRepository: Repository<Subtask>
  ) {}
  async create(Columns: Partial<Columns>): Promise<Columns> {
    const newuser = this.columnRepository.create(Columns);
    return this.columnRepository.save(newuser);
  }








  async createTaskInColumn(id: string, newTask: Task): Promise<void> {
    // Find the column
    const column = await this.columnRepository.findOne({ where: { id } });
    if (!column) {
      throw new NotFoundException('Column not found');
    }
  
    // Set the column reference for the new task
    newTask.column = column;
  
    // Create and associate the task
    const savedTask = await this.taskRepository.save(newTask);
  
    if (newTask.subtasks) {
      for (const subtask of newTask.subtasks) {
        subtask.task = savedTask; // Set the task reference for the subtask
        await this.subtaskRepository.save(subtask);
      }
    }
  
    
  }
  

 

  async findOne(id: string): Promise<Columns> {
    return this.columnRepository.findOne({where: { id }, relations: ['tasks', 'tasks.subtasks'] });
  }

  async update(id: string, Board: Partial<Columns>): Promise<Columns> {
    await this.columnRepository.update(id, Board);
    return this.columnRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    const task = await this.columnRepository.findOne( {where:{id}, relations: ['tasks','tasks.subtasks'] });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
  
    // Delete the task and its associated subtasks
    await this.columnRepository.delete(id);
  }
}
