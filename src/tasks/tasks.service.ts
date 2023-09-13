/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/tasks.entity';
import { Columns } from 'src/column/entities/column.entity';
import { Subtask } from 'src/subtask/entities/subtask.entity';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Columns)
    private columnRepository: Repository<Columns>, 
    @InjectRepository(Subtask)
    private subtaskRepository: Repository<Subtask> ) {}


    // function to update a task and this current subtask 

    async updateTaskAndSubtask(id: string, updatedTask: Task, updatedSubtasks: Subtask[]): Promise<Task> {
      // Find the task by its id along with its subtasks
      const task = await this.taskRepository.findOne({where:{id}, relations: [ 'subtasks'] });
    
      if (!task) {
        throw new NotFoundException('Task not found');
      }
    
      // Update the task's properties
      Object.assign(task, updatedTask);
    
      // Update existing subtasks
      task.subtasks.forEach((subtask) => {
        const updatedSubtask = updatedSubtasks.find((us) => us.id === subtask.id);
    
        if (updatedSubtask) {
          Object.assign(subtask, updatedSubtask);
        }
      });
    
      // Create and associate new subtasks
      updatedSubtasks
        .filter((us) => !us.id) // Filter out subtasks with an ID (existing subtasks)
        .forEach((newSubtask) => {
          newSubtask.task = task;
          task.subtasks.push(newSubtask);
        });
    
      // Delete subtasks that were removed
      const subtasksToRemove = task.subtasks.filter(
        (subtask) => !updatedSubtasks.some((us) => us.id === subtask.id)
      );
      await this.subtaskRepository.remove(subtasksToRemove);
    
      // Save the updated task
      await this.taskRepository.save(task);
    
      return task;
    }

  

 
  async findOne(id: string): Promise<Task> {
    return this.taskRepository.findOne({ where: { id } ,relations:['subtasks'] });
  }


  async delete(id: string): Promise<void> {
    const task = await this.taskRepository.findOne( {where:{id}, relations: ['subtasks'] });
  if (!task) {
    throw new NotFoundException('Task not found');
  }

  // Delete the task and its associated subtasks
  await this.taskRepository.remove(task);
  }
}
