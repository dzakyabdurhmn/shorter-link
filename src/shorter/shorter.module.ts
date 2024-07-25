import { Module } from '@nestjs/common';
import { ShorterController } from './shorter.controller';
import { ShorterService } from './shorter.service';
@Module({
  controllers: [ShorterController],
  providers: [ShorterService],
})
export class ShorterModule {}
