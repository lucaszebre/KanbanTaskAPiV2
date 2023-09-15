/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, NotAcceptableException } from '@nestjs/common';
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

  // Find one Column
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.columnService.findOne(id);
    } catch (error) {
      // Handle the error here and return an appropriate response
      throw new NotAcceptableException('Column not found');
    }
  }

  // Update one Column
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateOne(@Param('id') id: string, @Body() column: Columns) {
    try {
      return await this.columnService.update(id, column);
    } catch (error) {
      // Handle the error here and return an appropriate response
      throw new NotAcceptableException('Failed to update column');
    }
  }

  // Delete one Column
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.columnService.delete(id);
    } catch (error) {
      // Handle the error here and return an appropriate response
      throw new NotAcceptableException('Failed to delete column');
    }
  }

  // Add Tasks into a column
  @UseGuards(AuthGuard)
  @Post(':id/tasks/')
  async addTask(@Param('id') id: string, @Body() task: Task) {
    try {
      return await this.columnService.createTaskInColumn(id, task);
    } catch (error) {
      // Handle the error here and return an appropriate response
      throw new NotAcceptableException('Failed to add tasks to the column');
    }
  }
  



}
