/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, BadRequestException,UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { BoardService } from 'src/boards/boards.service';
import { Board } from 'src/boards/entities/boards.entity';
import { Columns } from 'src/column/entities/column.entity';
import { BoardCreateDto } from 'src/boards/dto/board-create.dto';
@Controller('users')
    export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly boardsService : BoardService
        ) {}

    //get user by id


    // // Get one of  the boards of user connected 
    // @UseGuards(AuthGuard)
    // @Get(':id/boards/:boardId')
    // async findOneBoard(@Param('id') id: string,@Param('boardId') boardId:string): Promise<Board> {
    //     const user = await this.boardsService.findOneBoardWithDetails(id,boardId);
    //     if (!user) {
    //     throw new NotFoundException('User does not exist!');
    //     } else {
    //     return user;
    //     }
    // } 
    
    // Get the user and Boards that he own 
    @UseGuards(AuthGuard)
    @Get(':id')
    async findAllBoards(@Param('id') id: string): Promise<User> {
        const AllBoard = await this.usersService.findOneWithDetails(id);
        if (!AllBoard) {
        throw new NotFoundException('User does not exist!');
        } else {
        return AllBoard;
        }
    } 

  

    // Create a boards 
    @UseGuards(AuthGuard)
    @Post(':id/boards')
    async createBoard(@Param('id') id:string,@Body() BoardCreateDto) : Promise<void> {
        return await this.boardsService.createBoard(id,BoardCreateDto.name,BoardCreateDto.columns);
    
    }

  

    //update user
    @UseGuards(AuthGuard)
    @Put(':id')
    async update (@Param('id') id: string, @Body() user: User): Promise<any> {
        return this.usersService.update(id, user);
    }

    //delete user
    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<any> {
        //handle error if user does not exist
        const user = await this.usersService.findOneWithDetails(id);
        if (!user) {
        throw new NotFoundException('User does not exist!');
        }
        return this.usersService.delete(id);
    }

    }
