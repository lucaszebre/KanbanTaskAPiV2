/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { Subtask } from './entities/subtask.entity';
import { SubtaskService } from './subtask.service';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('subtask')
export class SubtaskController {
  constructor(private readonly subtaskService: SubtaskService) {}
  

  // toggle the subtask 
  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() Subtask:Subtask): Promise<any>  {
    try {
      return this.subtaskService.update(id, Subtask);
    } catch (error) {
      throw new HttpException('Subtask not found', HttpStatus.NOT_FOUND);
    }
    

  }
  

}
