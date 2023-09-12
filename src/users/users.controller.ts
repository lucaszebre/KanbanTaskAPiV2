/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, BadRequestException,UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { BoardService } from 'src/boards/boards.service';
import { Board } from 'src/boards/entities/boards.entity';
@Controller('users')
    export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly boardsService : BoardService
        ) {}

    //get user by id
    @UseGuards(AuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User> {
        const user = await this.usersService.findByID(id);
        if (!user) {
        throw new NotFoundException('User does not exist!');
        } else {
        return user;
        }
    }

    // Get all the boards of user connected 
    @UseGuards(AuthGuard)
    @Get(':id/boards/:boardId')
    async findOneBoard(@Param('id') id: string,@Param('boardId') boardId:string): Promise<Board> {
        const user = await this.boardsService.findOneBoardWithDetails(id,boardId);
        if (!user) {
        throw new NotFoundException('User does not exist!');
        } else {
        return user;
        }
    } 
    
    
    @UseGuards(AuthGuard)
    @Get(':id/boards')
    async findAllBoards(@Param('id') id: string): Promise<User> {
        const AllBoard = await this.usersService.findOneWithDetails(id);
        if (!AllBoard) {
        throw new NotFoundException('User does not exist!');
        } else {
        return AllBoard;
        }
    } 
    @UseGuards(AuthGuard)
    @Post(':id/boards')
    async createBoard(@Body() board:Board) : Promise<Board> {
        const Newboard = await this.boardsService.create(board);
        if (!Newboard) {
        throw new NotFoundException('User does not exist!');
        } else {
        return Newboard;
        }
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
        const user = await this.usersService.findByID(id);
        if (!user) {
        throw new NotFoundException('User does not exist!');
        }
        return this.usersService.delete(id);
    }

    }
