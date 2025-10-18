// backend/src/auth/auth.service.ts
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || !user.password) {
      return null;
    }

    const isPasswordMatching = await bcrypt.compare(pass, user.password);

    if (user && isPasswordMatching) {
      const { password, ...result } = user;
      return result;
    }
    
    return null;
  }

  async login(user: any) {
    const payload = { 
      email: user.email, 
      sub: user.id, 
      username: user.username, 
      role: user.role 
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  
  async signUp(email: string, pass: string) {
    // 1. Check if user with that email already exists
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    
    // 2. Hash the password
    const hash = await bcrypt.hash(pass, 10);
    
    // 3. Create the new user
    const newUser = await this.prisma.user.create({
      data: {
        email: email,
        password: hash,
      },
    });
    
    const { password, ...result } = newUser;
    return result;
  }
}