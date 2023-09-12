/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/tasks.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/users/users.guard';
@Controller('tasks')
export class TasksController {
  
  constructor(private readonly tasksService: TasksService) {}
  @Roles(Role.Admin)
  @UseGuards(AuthGuard,RolesGuard)
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

  


  @Roles(Role.Admin)
  @UseGuards(AuthGuard,RolesGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() task:Task): Promise<any> {
    return this.tasksService.update(id, task);
  }
  @Roles(Role.Admin)
  @UseGuards(AuthGuard,RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }
}
