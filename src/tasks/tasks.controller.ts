/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/tasks.entity';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('tasks')
export class TasksController {
  
  constructor(private readonly tasksService: TasksService) {}
  


  // Get a task and current subtask 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  

  // Update a task and current subtask
  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() task:Task): Promise<any> {
    return this.tasksService.update(id, task);
  }

  // Delete a task and current subtask cascasdly
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }
}
