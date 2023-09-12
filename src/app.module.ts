/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { TasksModule } from './tasks/tasks.module';
import { BoardsModule } from './boards/boards.module';
import { SubtaskModule } from './subtask/subtask.module';
import { UserExistsMiddleware } from './auth/middleware/alreadyRegister';
import { ColumnModule } from './column/column.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 3001,
      password: '',
      username: 'postgres',
      database: 'postgres',
      synchronize: true,
      logging: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
    }),
    AuthModule,
    TasksModule,
    BoardsModule,
    SubtaskModule,
    ColumnModule,
  ],
  controllers: [AppController, ],
  providers: [AppService,{
    provide: APP_GUARD,
    useClass: AuthGuard,
  } ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserExistsMiddleware)
      .forRoutes({ path: 'auth/register', method: RequestMethod.POST });
  }}
