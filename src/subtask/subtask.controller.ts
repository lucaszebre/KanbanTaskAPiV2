/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { Subtask } from './entities/subtask.entity';
import { SubtaskService } from './subtask.service';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('subtask')
export class SubtaskController {
  constructor(private readonly ordersService: SubtaskService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() Subtask:Subtask): Promise<Subtask>  {
    return this.ordersService.create(Subtask);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() Subtask:Subtask): Promise<any>  {
    return this.ordersService.update(id, Subtask);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.delete(id);
  }

}
