import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ComponentsService } from './components.service';

@ApiTags('components')
@Controller('components')
export class ComponentsController {
  constructor(private readonly componentsService: ComponentsService) {}

  @Get()
  @ApiOkResponse({
    description: 'List components (metadata only)',
    schema: {
      example: {
        items: [{ id: '1', title: 'NAME', description: 'DESC' }],
      },
    },
  })
  async findAll() {
    return { items: await this.componentsService.findAll() };
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: '1' })
  @ApiOkResponse({
    description: 'Get component by id (includes html/css/js)',
    schema: {
      example: {
        id: '1',
        title: 'NAME',
        description: 'DESC',
        html: '<button>Pay</button>',
        css: 'button{...}',
        js: 'console.log("hi")',
      },
    },
  })
  async findOne(@Param('id') id: string) {
    return this.componentsService.findOne(id);
  }
}