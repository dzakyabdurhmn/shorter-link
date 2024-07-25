import { Injectable } from '@nestjs/common';

import type { IKeyProvide } from './key-provide.interface';

@Injectable()
export class KeyProvideService {
  public async fetch(username: string): Promise<IKeyProvide> {
    return Promise.resolve({
      id: 'swssw',
      screet_key: 'uueijwwdw',
      createdAt: 'Tue Feb 05 2019 12:05:22 GMT+0530 (IST)',
      endAt: 'Tue Feb 05 2019 12:05:22 GMT+0530 (IST)',
    });
  }
}
