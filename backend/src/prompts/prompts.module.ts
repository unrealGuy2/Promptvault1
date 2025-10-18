// backend/src/prompts/prompts.module.ts
import { Module } from '@nestjs/common';
import { PromptsController } from './prompts.controller';
import { PromptsService } from './prompts.service';
import { PrismaService } from '../prisma.service';
import { NotificationsModule } from '../notifications/notifications.module'; // <-- Added

@Module({
  imports: [
    NotificationsModule // <-- Added
  ],
  controllers: [PromptsController],
  providers: [PromptsService, PrismaService],
})
export class PromptsModule {}