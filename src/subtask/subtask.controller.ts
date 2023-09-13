/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
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
    return this.subtaskService.update(id, Subtask);
  }
  

}
