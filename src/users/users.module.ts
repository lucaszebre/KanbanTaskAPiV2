/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { BoardsModule } from 'src/boards/boards.module';
import { Repository } from 'typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([User]),BoardsModule],
  controllers: [UsersController],
  providers: [UsersService,Repository],
  exports: [UsersService,TypeOrmModule],
})
export class UsersModule {}
