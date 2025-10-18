// backend/src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common'; // Added UnauthorizedException
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // Check if the secret key is defined
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in the environment variables.');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret, // Use the validated secret
    });
  }

  async validate(payload: any) {
    // Check if payload exists and has the required fields
    if (!payload || !payload.sub) {
        throw new UnauthorizedException('Invalid token payload');
    }
    return { 
      userId: payload.sub, 
      email: payload.email, 
      username: payload.username, 
      role: payload.role 
    };
  }
}