import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('url')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAllUrls(): Promise<any> {
    return this.appService.getAllUrls();
  }

  @Get(':id')
  async getUrl(@Param('id') id: number): Promise<any> {
    return this.appService.getUrl(id);
  }

  @Post()
  async createUrl(@Body() body: { url: string }): Promise<any> {
    await this.appService.createUrl(body.url);
    return {
      status: 'swsw',
    };
  }

  @Put(':id')
  async updateUrl(
    @Param('id') id: number,
    @Body() body: { url: string },
  ): Promise<any> {
    return this.appService.updateUrl(id, body.url);
  }

  @Delete(':id')
  async deleteUrl(@Param('id') id: number): Promise<any> {
    return this.appService.deleteUrl(id);
  }
}
