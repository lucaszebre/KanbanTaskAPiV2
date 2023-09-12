/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ColumnService } from './column.service';
import { Columns } from './entities/column.entity';

@Controller('column')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Post()
  create(@Body() Columns:Columns): Promise<Columns> {
    return this.columnService.create(Columns);
  }

  @Get()
  findAll() {
    return this.columnService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.columnService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() Columns:Columns): Promise<any>  {
    return this.columnService.update(id, Columns);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.columnService.delete(id);
  }
}
