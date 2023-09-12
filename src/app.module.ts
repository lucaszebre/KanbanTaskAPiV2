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
import { CommentsModule } from './comments/comments.module';
import { ReservationsModule } from './reservations/reservations.module';
import { ReportsModule } from './reports/reports.module';
import { SubtaskModule } from './orders/orders.module';
import { UserExistsMiddleware } from './auth/middleware/alreadyRegister';
import { RolesGuard } from './users/users.guard';

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
      database: 'blogpost',
      synchronize: true,
      logging: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    AuthModule,
    TasksModule,
    CommentsModule,
    ReservationsModule,
    ReportsModule,
    SubtaskModule,
  ],
  controllers: [AppController, ],
  providers: [AppService,{
    provide: APP_GUARD,
    useClass: AuthGuard,
  },{
    provide: APP_GUARD,
    useClass: RolesGuard,
  } ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserExistsMiddleware)
      .forRoutes({ path: 'auth/register', method: RequestMethod.POST });
  }}
