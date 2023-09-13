/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ColumnService } from './column.service';
import { Columns } from './entities/column.entity';
import { TasksService } from 'src/tasks/tasks.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Task } from 'src/tasks/entities/tasks.entity';

@Controller('column')
export class ColumnController {
  constructor(
    private readonly columnService: ColumnService,
    private readonly taskService: TasksService
    ) {}

  // Get one Column

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.columnService.findOne(id);
  } 
  
  // Update one Column
  @UseGuards(AuthGuard)
  @Put(':id')
  UpdateOne(@Param('id') id: string , @Body() Column:Columns): Promise<any>  {
    return this.columnService.update(id,Column);
  }

// Delete one Column

@UseGuards(AuthGuard)
@Delete(':id')
remove(@Param('id') id: string) {
  return this.columnService.delete(id);
}



// Add a Tasks into a columns
  @UseGuards(AuthGuard)
  @Put(':id/tasks/:taskId')
  AddTask(@Param('id') id: string, @Body() Task:Task[]): Promise<any>  {
    return this.columnService.createTaskInColumn(id, Task);
  }
  



}
