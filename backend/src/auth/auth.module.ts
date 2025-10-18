// backend/src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
// Removed Google Strategy/Controller imports as we reverted that feature

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Reads from .env
      signOptions: { expiresIn: '60m' }, // Token expires in 60 minutes
    }),
  ],
  providers: [AuthService, PrismaService, JwtStrategy], // Removed GoogleStrategy
  // Removed AuthController as it was only for Google OAuth
  exports: [AuthService],
})
export class AuthModule {}