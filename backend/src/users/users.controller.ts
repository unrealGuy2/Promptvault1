// backend/src/users/users.controller.ts
import { Controller, Get, Post, Body, UseGuards, Request, Patch, UnauthorizedException, Param, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { Role } from '@prisma/client';

export const JwtAuthGuard = AuthGuard('jwt');

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}
  
  @Get('profile/:username')
  getUserProfile(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @UseGuards(JwtAuthGuard)
  @Get('feed')
  getFeed(@Request() req) {
    const userId = req.user.userId;
    return this.usersService.getFeedForUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  updateProfile(@Request() req, @Body() body: { username?: string; role?: Role; bio?: string; image?: string }) {
    const userId = req.user.userId;
    return this.usersService.updateProfile(userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.usersService.findOne(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/follow')
  followUser(@Request() req, @Param('id') id: string) {
    const followerId = req.user.userId;
    return this.usersService.followUser(followerId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/follow')
  unfollowUser(@Request() req, @Param('id') id: string) {
    const followerId = req.user.userId;
    return this.usersService.unfollowUser(followerId, id);
  }

  @Post('login')
  async login(@Body() body: { email: string; pass: string }) {
    const user = await this.authService.validateUser(body.email, body.pass);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('signup')
  async signUp(@Body() body: { email: string; pass: string }) {
    return this.authService.signUp(body.email, body.pass);
  }
}