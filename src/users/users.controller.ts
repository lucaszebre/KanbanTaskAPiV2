/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, BadRequestException,UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuard } from './users.guard';
import { Role } from 'src/enums/role.enum';
import { User } from './user.entity';
import { Roles } from './decorators/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('users')
    export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    
        ) {}

    //get all users
    @Roles(Role.Admin) 
    @UseGuards(AuthGuard,RolesGuard)
    @Get()
    //// Specify the required role(s) for this route
    async findAll(): Promise<User[]> {
    
            return await this.usersService.findAll();
        
        
    }

    //get user by id
    @Roles(Role.Admin,Role.User)
    @UseGuards(AuthGuard,RolesGuard)
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<User> {
        const user = await this.usersService.findByID(id);
        if (!user) {
        throw new NotFoundException('User does not exist!');
        } else {
        return user;
        }
    }

    //create user
    // @Post()
    // async create(@Body() user: User): Promise<User> {
    //     try {
    //         return this.usersService.create(user);
    //     } catch (error) {
    //         throw new BadRequestException('Some propertie is missing -_-', { cause: new Error(), description: 'Some error description' })

    //     }
        
    // }

    //update user
    @Roles(Role.Admin,Role.User)
    @UseGuards(AuthGuard,RolesGuard)
    @Put(':id')
    async update (@Param('id') id: number, @Body() user: User): Promise<any> {
        return this.usersService.update(id, user);
    }

    //delete user
    @Roles(Role.Admin)
    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        //handle error if user does not exist
        const user = await this.usersService.findByID(id);
        if (!user) {
        throw new NotFoundException('User does not exist!');
        }
        return this.usersService.delete(id);
    }
    // // Get all the comment of a user 
    // @UseGuards(AuthGuard)
    // @Get(':userId/comments')
    // async getUserComments(@Param('userId') userId: string) {
    //     return this.commentService.findAllCommentUser(parseInt(userId))
    // }
    // // Get all the order of a user
    // @UseGuards(AuthGuard) 
    // @Get(':userId/orders')
    // async getUserSubtask(@Param('userId') userId: string) {
    //     return this.orderService.findSubtaskUsers(parseInt(userId))
    // }
    // // Get all the Report of a user
    // @UseGuards(AuthGuard)
    // @Get(':userId/reports')
    // async getUserReports(@Param('userId') userId: string) {
    //     return this.reportService.findAllReportUser(parseInt(userId))
    // }
    // // Get all the reservation of a user 
    // @UseGuards(AuthGuard)
    // @Get(':userId/reservations')
    // async getUserReservation(@Param('userId') userId: string) {
    //     return this.reservationService.findAllReservationUser(parseInt(userId))
    // }
    }
