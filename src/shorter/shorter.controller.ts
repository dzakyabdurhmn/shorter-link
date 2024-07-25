import {
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { ShorterService } from './shorter.service';
import { ShorterRequest, ShorterResponse } from 'src/model/shorter.model';
import { WebResponse } from 'src/model/web.response';
import { ErrorFilter } from 'src/common/error.filter';

@Controller('/api/shorter')
export class ShorterController {
  constructor(private shorterService: ShorterService) {}

  @Post()
  @UseFilters(ErrorFilter)
  async register(
    @Body() request: ShorterRequest,
    @Headers('url') base_url: string,
  ): Promise<WebResponse<ShorterResponse>> {
    const data = await this.shorterService.Post(request);
    return {
      code: HttpStatus.OK,
      status: 'OK',
      data: {
        id: data.id_url,
        long_url: data.long_url,
        short_url: `${base_url}/${data.short_url}`,
      },
    };
  }

  @Get()
  @UseFilters(ErrorFilter)
  async Get(@Query('url') url: string): Promise<ShorterResponse> {
    const res = await this.shorterService.Get(url);
    return {
      response: res.long_url,
    };
  }
}
