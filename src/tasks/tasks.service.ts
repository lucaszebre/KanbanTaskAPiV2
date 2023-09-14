/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from './entities/tasks.entity';
import { Subtask } from 'src/subtask/entities/subtask.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Subtask)
    private subtaskRepository: Repository<Subtask> ) {}


    // function to update a task and this current subtask 

    async updateTaskAndSubtask(id: string, updatedTask: Task, updatedSubtasks: Subtask[]): Promise<Task> {
      // Find the task
      const task = await this.taskRepository.findOne({ where: { id }, relations: ['subtasks'] });
      
      if (!task) {
        throw new NotFoundException('Task not found');
      }
      
      // Update the task's properties
      Object.assign(task, updatedTask);
      
      // Remove subtasks that no longer exist
      const subtasksToRemove = task.subtasks.filter((subtask) => {
        return !updatedSubtasks.some((us) => us.id === subtask.id);
      });
      
      // Ensure that all subtasks to remove have valid IDs
      if (subtasksToRemove.some((subtask) => !subtask.id)) {
        throw new BadRequestException('Some subtasks are missing IDs');
      }
      
      // Remove subtasks
      await this.subtaskRepository.remove(subtasksToRemove);
      
      // Update existing subtasks and create new ones
      task.subtasks = await Promise.all(
        updatedSubtasks.map(async (updatedSubtask) => {
          // If the subtask already exists, update it
          if (updatedSubtask.id) {
            const existingSubtask = task.subtasks.find((subtask) => subtask.id === updatedSubtask.id);
            if (existingSubtask) {
              Object.assign(existingSubtask, updatedSubtask);
              return existingSubtask;
            }
          }
          
          // If it's a new subtask, create and associate it
          updatedSubtask.task = task;
          return await this.subtaskRepository.save(updatedSubtask);
        })
      );
      
      // Save the updated task
      const updatedTaskResult = await this.taskRepository.save(task);
      
      // return updatedTaskResult;
      return updatedTaskResult
    }
  
  

  

 
  async findOne(id: string): Promise<Task> {
    return this.taskRepository.findOne({ where: { id } ,relations:['subtasks'] });
  }


  async delete(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne( {where:{id}, relations: ['subtasks'] });
  if (!task) {
    throw new NotFoundException('Task not found');
  }

  // Delete the task and its associated subtasks
  await this.taskRepository.remove(task);

  return task 
  }
}
