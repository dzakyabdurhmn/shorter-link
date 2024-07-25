import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ShorterModule } from './shorter/shorter.module';
@Module({
  imports: [CommonModule, ShorterModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
