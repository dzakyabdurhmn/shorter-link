import { Injectable } from '@nestjs/common';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';

@Injectable()
export class AppService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async getAllUrls(): Promise<any> {
    return await this.knex.select('*').from('example_table');
  }

  async getUrl(id: number): Promise<any> {
    return await this.knex
      .select('*')
      .from('example_table')
      .where('id', id)
      .first();
  }

  async createUrl(url: string): Promise<any> {
    return await this.knex('example_table').insert({ url });
  }

  async updateUrl(id: number, url: string): Promise<any> {
    return await this.knex('example_table').where('id', id).update({ url });
  }

  async deleteUrl(id: number): Promise<any> {
    return await this.knex('example_table').where('id', id).del();
  }
}
