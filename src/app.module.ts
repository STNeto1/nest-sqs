import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SqsModule } from '@ssut/nestjs-sqs';
import { configSchema } from './config/config.schema';

import { MessageModule } from './message/message.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => {
        const obj = {
          AWS_ACCESS_KEY_ID: config['AWS_ACCESS_KEY_ID'],
          AWS_REGION: config['AWS_REGION'],
          AWS_SECRET_ACCESS_KEY: config['AWS_SECRET_ACCESS_KEY'],
          AWS_SQS_ENDPOINT: config['AWS_SQS_ENDPOINT'],
        };

        return configSchema.parse(obj);
      },
    }),
    SqsModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          consumers: [
            {
              name: 'test_queue',
              queueUrl: configService.get('AWS_SQS_ENDPOINT'),
              region: configService.get('AWS_REGION'),
              waitTimeSeconds: 0,
            },
          ],
          producers: [
            {
              name: 'test_queue',
              queueUrl: configService.get('AWS_SQS_ENDPOINT'),
              region: configService.get('AWS_REGION'),
            },
          ],
        };
      },
    }),
    MessageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
