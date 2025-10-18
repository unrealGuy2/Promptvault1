// backend/src/prompts/prompts.controller.ts
import { Controller, Get, Post, Body, Request, UseGuards, Param, Delete } from '@nestjs/common';
import { PromptsService } from './prompts.service';
import { JwtAuthGuard } from '../users/users.controller';

@Controller('prompts')
export class PromptsController {
  constructor(private readonly promptsService: PromptsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() body: { title: string; description: string; tags: string[]; category: string }) {
    const authorId = req.user.userId;
    return this.promptsService.create({ ...body, authorId });
  }

  @Get()
  findAll() {
    return this.promptsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  likePrompt(@Request() req, @Param('id') id: string) {
    const userId = req.user.userId;
    return this.promptsService.likePrompt(userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/like')
  unlikePrompt(@Request() req, @Param('id') id: string) {
    const userId = req.user.userId;
    return this.promptsService.unlikePrompt(userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/comments')
  createComment(@Request() req, @Param('id') id: string, @Body() body: { text: string }) {
    const userId = req.user.userId;
    return this.promptsService.createComment(id, userId, body.text);
  }

  @Get(':id/comments')
  getComments(@Param('id') id: string) {
    return this.promptsService.findCommentsForPrompt(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/fork')
  forkPrompt(@Request() req, @Param('id') id: string) {
    const newAuthorId = req.user.userId;
    return this.promptsService.forkPrompt(id, newAuthorId);
  }
}