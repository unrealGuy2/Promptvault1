// backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PromptsModule } from './prompts/prompts.module';
import { SearchModule } from './search/search.module';
import { AuthModule } from './auth/auth.module';
import { TeamsModule } from './teams/teams.module'; // Ensures this is imported
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes .env variables available globally
    }),
    UsersModule,
    PromptsModule,
    SearchModule,
    AuthModule,
    TeamsModule, // Ensures this is included
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}