import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/entities/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { 
      sub: user.id, 
      username: user.username 
    };
    
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(username: string, password: string): Promise<{ access_token: string }> {
    const existingUser = await this.usersService.findOne(username);
    if (existingUser) {
      throw new ConflictException('Аль хэдийн бүртгэлтэй хэрэглэгч байна!');
    }

    const user = await this.usersService.create({username, password });

    const payload = { 
      sub: user.id, 
      username: user.username 
    };
    
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}