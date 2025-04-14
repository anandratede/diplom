// src/users/user.controller.ts
import { Controller, Get, Post, Body, Param, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

//   @Get()
//   findAll(): Promise<User[]> {
//     return this.usersService.findAll();
//   }

//   @Get('profile')
//   @UseGuards(JwtAuthGuard)
//   getProfile(@Request() req) {
//     return this.usersService.findOne(req.user.id);
//   }

  @Post(':id')
  findOne(@Param('id', ParseIntPipe) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }
}