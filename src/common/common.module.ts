import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nestjs-knex';
import { ValidationService } from './validation.service';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from './error.filter';
import { ValidationModule } from './validation.module';

@Global()
@Module({
  imports: [
    ValidationModule.forRoot(true),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    KnexModule.forRoot({
      config: {
        client: 'mysql',
        useNullAsDefault: true,
        connection: {
          database: 'shorter',
          user: 'root',
          password: '',
          host: 'localhost',
          port: 3306,
          ssl: false,
        },
      },
    }),
  ],
  providers: [
    ValidationService,
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
  exports: [ValidationService],
})
export class CommonModule {}
