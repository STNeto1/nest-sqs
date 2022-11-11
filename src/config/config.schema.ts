import { z } from 'zod';

export const configSchema = z.object({
  AWS_REGION: z.string(),
  AWS_SQS_ENDPOINT: z.string().url(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
});
