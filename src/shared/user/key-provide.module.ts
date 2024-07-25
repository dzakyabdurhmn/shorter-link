import { Module } from '@nestjs/common';

import { KeyProvideService } from './key-provide.service';

@Module({
  providers: [KeyProvideService],
  exports: [KeyProvideService],
})
export class UserModule {}
