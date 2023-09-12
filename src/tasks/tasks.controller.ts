/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/tasks.entity';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('tasks')
export class TasksController {
  
  constructor(private readonly tasksService: TasksService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() task:Task): Promise<Task> {
    return this.tasksService.create(task);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  


  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() task:Task): Promise<any> {
    return this.tasksService.update(id, task);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }
}
