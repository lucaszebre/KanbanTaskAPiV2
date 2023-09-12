/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private UsersService: UsersService,
    private jwtService: JwtService
    ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.UsersService.findOne(username);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    const passwordValid = await bcrypt.compare(pass, user.password);
   
  if (user && passwordValid) {
    const payload = { id: user.id, email: user.email , role:user.role };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  return null;
}
  }

