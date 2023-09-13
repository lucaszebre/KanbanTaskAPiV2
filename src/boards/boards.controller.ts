/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { BoardService } from './boards.service';
import { Board } from './entities/boards.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { BoardCreateDto } from './dto/board-create.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardService) {}

  // Create a new Board
  @UseGuards(AuthGuard)
  @Post()
  create(@Param('id') id: string, @Body() createDto: BoardCreateDto): Promise<void> {
    return this.boardsService.createBoard(id, createDto.name, createDto.columns);
  }


  // @UseGuards(AuthGuard)
  // @Get()
  // findAll() {
  //   return this.boardsService.findAll();
  // }
  

  // Get one Board 
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardsService.findOne(id);
  }

  // Update a Board 
  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() Board:Board): Promise<any>  {
    return this.boardsService.updateBoard(id, Board);
  }

  // Delete one Board 
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardsService.deleteBoard(id);
  }
  
  
}
