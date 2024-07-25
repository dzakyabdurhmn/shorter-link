import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nestjs-knex';
import { ValidationService } from 'src/common/validation.service';
import { ShorterRequest, ShorterResponse } from 'src/model/shorter.model';
import { z } from 'zod';
import { ShorterValidationZodSchema } from './shorter.validation';

function createRandomString(length) {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const randomArray = new Uint8Array(length);
  crypto.getRandomValues(randomArray);
  randomArray.forEach((number) => {
    result += chars[number % chars.length];
  });
  return result;
}

@Injectable()
export class ShorterService {
  constructor(
    @InjectConnection() private readonly knex: Knex,
    private validationService: ValidationService,
  ) {}

  async Post(request: ShorterRequest) {
    const res: ShorterRequest = this.validationService.validate(
      ShorterValidationZodSchema.URL,
      request,
    );
    const result = await this.knex.table('url').insert({
      short_url: createRandomString(7),
      long_url: res.long_url,
    });

    const insertedId = result[0];

    const data = await this.knex
      .table('url')
      .where('id_url', insertedId)
      .first();
    const dataArray = Object.values(data);

    console.log(dataArray);

    return data;
  }

  async Get(short_url: string): Promise<any> {
    let parts: string[] = short_url.split('/');
    let id: string = parts[parts.length - 1];

    const result = await this.knex('url').where({ short_url: id }).first();
    if (!result) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'url not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }
}
