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

    async updateTaskAndSubtask(
      id: string,
      updatedTask: Task,
      SubtasksAdd: string[],
      SubtasksChangeName: Subtask[],
      SubtaskstoDelete: string[],
    ): Promise<Task> {
      // Find the task
      const task = await this.taskRepository.findOne({ where: { id }, relations: ['subtasks'] });
    
      if (!task) {
        throw new NotFoundException('Task not found');
      }
    
      // Update the task's properties
      Object.assign(task, updatedTask);
    
      // Remove subtasks marked for deletion
      if (SubtaskstoDelete.length > 0) {
        task.subtasks = task.subtasks.filter((subtask) => !SubtaskstoDelete.includes(subtask.id));
        await this.subtaskRepository.delete(SubtaskstoDelete);
      }
    
      // Update existing subtasks and create new ones
      for (const updatedSubtask of SubtasksChangeName) {
        const existingSubtask = task.subtasks.find((subtask) => subtask.id === updatedSubtask.id);
    
        if (existingSubtask) {
          // If the subtask already exists, update its name
          existingSubtask.title = updatedSubtask.title;
          await this.subtaskRepository.save(existingSubtask);
        }
      }
    
      for (const subtaskTitle of SubtasksAdd) {
        // Create a new subtask and associate it
        const newSubtask = new Subtask();
        newSubtask.task = task;
        newSubtask.title = subtaskTitle;
        task.subtasks.push(newSubtask); // Add the new subtask to the task's subtasks array
        await this.subtaskRepository.save(newSubtask);
      }
    
      // Save the updated task
      const updatedTaskResult = await this.taskRepository.save(task);
    
      return updatedTaskResult;
    }
    
    
    
    
    
    
    
  
  

  

 
  async findOne(id: string): Promise<Task> {
    return this.taskRepository.findOne({ where: { id } ,relations:['subtasks'] });
  }


  async delete(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id }, relations: ['subtasks'] });
    
    if (!task) {
      throw new NotFoundException('Task not found');
    }
  
    // Delete the associated subtasks first
    if (task.subtasks && task.subtasks.length > 0) {
      await this.subtaskRepository.remove(task.subtasks);
    }
  
    // Delete the task itself
    await this.taskRepository.remove(task);
  
    return task;
  }
}
