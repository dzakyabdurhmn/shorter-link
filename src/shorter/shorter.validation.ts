// zod schema

import { z, ZodType } from 'zod';

export class ShorterValidationZodSchema {
  static readonly URL: ZodType = z.object({
    long_url: z.string().url(),
    short_url: z.optional(
      z
        .string()
        .min(4)
        .max(50)
        .refine(
          (value) => /^(?!https?:\/\/).*/.test(value ?? ''),
          'Input should not be a URL',
        ),
    ),
  });
}
