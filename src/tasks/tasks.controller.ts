/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/tasks.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request, Response, NextFunction } from 'express';

@Controller('tasks')
export class TasksController {
  
  constructor(private readonly tasksService: TasksService) {}
  


  // Get a task and current subtask
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const task = await this.tasksService.findOne(id);
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  // Update a task and current subtask
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() task: Task): Promise<void> {
    const updatedTask = await this.tasksService.updateTaskAndSubtask(
      id,
      task,
      task.subtasks,
    );
    if (!updatedTask) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    
  }

  // Delete a task and current subtask cascadingly
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedTask = await this.tasksService.delete(id);
    if (!deletedTask) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return deletedTask;
  }
}

