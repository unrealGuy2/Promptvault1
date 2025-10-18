// backend/src/search/search.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async search(query: string) {
    const prompts = await this.prisma.prompt.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: {
        author: {
          select: { username: true },
        },
      },
    });

    const users = await this.prisma.user.findMany({
      where: {
        username: { contains: query, mode: 'insensitive' },
      },
      select: {
        id: true,
        username: true,
        image: true,
      },
    });

    return { prompts, users };
  }
}