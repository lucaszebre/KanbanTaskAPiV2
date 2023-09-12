/* eslint-disable prettier/prettier */
import { Body, Controller, Post,UseGuards,Get,Request, Res, Header } from '@nestjs/common';
import { UsersService } from '../users/users.service'
import { AuthGuard } from './auth.guard';
import { Response } from 'express';

import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { UserExistsMiddleware } from './middleware/alreadyRegister';
@Controller('auth')
export class AuthController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService, // Inject the AuthService
        ) {}
    //post / signup
    @Public()
    @UseGuards(UserExistsMiddleware) // Use the middleware on the registration route
    @Post('/register')
    async addUser(
        @Body('password') userPassword: string,
        @Body('email') email: string,
        @Body('name') name: string
    ) {
    const saltOrRounds = 10;
    const password = await bcrypt.hash(userPassword, saltOrRounds);
    const result = await this.usersService.create(
        {email,password,name}
    );
    return {
        msg: 'User successfully registered',
        email: result.email
    };
    }

    @Public()
    @Post('/login')
    @Header('Authorization', 'none')
    async signIn(@Body() signInDto: { email: string, password: string }, @Res() res: Response) {
        const result = await this.authService.signIn(signInDto.email, signInDto.password);
        
        if (result && result.access_token) {
            res.header('Authorization', `Bearer ${result.access_token}`);
            return res.status(200).send(result);
        }
    
      // ... handle failed login ...
    }
   
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @UseGuards(AuthGuard) // Protect the logout route with your authentication guard
    @Post('/logout')
    async logout(@Request() req, @Res() res: Response) {
        
        res.setHeader('Authorization', ''); // Clear the Authorization header (if you are using headers)

        // You can also add additional logout logic here, such as invalidating sessions or tokens.
        
        // Return a success message or an appropriate response.
        return res.status(200).json({ message: 'Logout successful' });
    }
}


