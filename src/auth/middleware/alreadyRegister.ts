/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserExistsMiddleware implements NestMiddleware {
    constructor(private readonly usersService: UsersService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const { email } = req.body; // Assuming you're checking by email, adjust as needed
        
        // Check if a user with the provided email already exists
        const userExists = await this.usersService.findOne(email);

        if (userExists) {
        return res.status(409).json({ message: 'User already exists' });
        }

        // If the user doesn't exist, continue with the request
        next();
    }
}
