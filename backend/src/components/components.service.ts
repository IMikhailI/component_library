import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ComponentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.client.component.findMany({
      select: {
        id: true,
        title: true,
        description: true,
      },
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: string) {
    const component = await this.prisma.client.component.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        html: true,
        css: true,
        js: true,
      },
    });

    if (!component) throw new NotFoundException('Component not found');
    return component;
  }
}