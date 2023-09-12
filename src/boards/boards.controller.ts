/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { BoardService } from './boards.service';
import { Board } from './entities/boards.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() Board:Board): Promise<Board>  {
    return this.boardsService.create(Board);
  }
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.boardsService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardsService.findOne(id);
  }
  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() Board:Board): Promise<any>  {
    return this.boardsService.update(id, Board);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.boardsService.delete(id);
  }
}
