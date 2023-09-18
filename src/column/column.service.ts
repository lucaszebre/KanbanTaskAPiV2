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
        subtask.task = savedTask;
         // Set the task reference for the subtask
        await this.subtaskRepository.save(subtask);
      }
    }
  
    
  }
  async SwitchTaskColumn(id: string, newTask: Task, taskToDelete: string): Promise<void> {
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
  
    // Find and delete the task to be removed
    const taskToDeleteEntity = await this.taskRepository.findOne({ where: { id: taskToDelete }, relations: ['subtasks'] });
    if (!taskToDeleteEntity) {
      throw new NotFoundException('Task to delete not found');
    }
  
    // Delete the associated subtasks first
    if (taskToDeleteEntity.subtasks && taskToDeleteEntity.subtasks.length > 0) {
      await this.subtaskRepository.remove(taskToDeleteEntity.subtasks);
    }
  
    // Then delete the task
    await this.taskRepository.remove(taskToDeleteEntity);
  }
  
  

 

  async findOne(id: string): Promise<Columns> {
    return this.columnRepository.findOne({where: { id }, relations: ['tasks', 'tasks.subtasks'] });
  }

  async update(id: string, Board: Partial<Columns>): Promise<Columns> {
    await this.columnRepository.update(id, Board);
    return this.columnRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    const column = await this.columnRepository.findOne( {where:{id}, relations: ['tasks','tasks.subtasks'] });
    if (!column) {
      throw new NotFoundException('Task not found');
    }
    for (const task of column.tasks) {
      for (const subtask of task.subtasks) {
        await this.subtaskRepository.remove(subtask);
      }
      await this.taskRepository.remove(task);
    }

    // Delete the task and its associated subtasks
    await this.columnRepository.delete(id);
  }
}
